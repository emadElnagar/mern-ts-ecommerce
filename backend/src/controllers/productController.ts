import { RequestHandler } from "express";
import Product from "../models/product";
import slugify from "slugify";
import Category from "../models/category";
import { Response } from "express";
import { AuthenticatedRequest } from "../types/authTypes";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Order from "../models/Order";

// GET ALL PRODUCTS
export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      products,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get best selling products
export const getBestSellingProducts: RequestHandler = async (_req, res) => {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last90Days = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    const getTopProducts = async (startDate: Date) => {
      const sales = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $unwind: "$orderItems" },
        {
          $group: {
            _id: "$orderItems.product",
            totalSold: { $sum: "$orderItems.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 8 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: "categories",
            localField: "product.category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $project: {
            _id: 0,
            product: 1,
            category: 1,
            totalSold: 1,
          },
        },
      ]);

      return sales;
    };

    const [best30Days, best90Days, bestYear] = await Promise.all([
      getTopProducts(last30Days),
      getTopProducts(last90Days),
      getTopProducts(lastYear),
    ]);

    res.status(200).json({
      last30Days: best30Days,
      last90Days: best90Days,
      lastYear: bestYear,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get best seller by category
export const getBestSellersByCategory: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find();
    const result: any = {};
    for (const category of categories) {
      const topProducts = await Order.aggregate([
        { $unwind: "$orderItems" },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        { $match: { "product.category": category._id } },
        {
          $group: {
            _id: "$orderItems.product",
            totalSold: { $sum: "$orderItems.quantity" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 6 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ]);
      result[category.title] = topProducts;
    }
    res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get best selling categories
export const getBestSellingCategories: RequestHandler = async (_req, res) => {
  try {
    // Aggregate total sold count per category
    const categorySales = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalSold: { $sum: "$sold" },
          totalProducts: { $sum: 1 },
        },
      },
      { $sort: { totalSold: -1 } },
    ]);

    // Populate category info (since aggregate doesn't auto-populate)
    const categoriesWithNames = await Category.populate(categorySales, {
      path: "_id",
      select: "title",
    });

    // Respond with formatted data
    res.status(200).json(
      (categoriesWithNames as any[]).map((category: any) => ({
        category: category._id,
        totalSold: category.totalSold,
        totalProducts: category.totalProducts,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart products
export const getCartProducts: RequestHandler = async (req, res) => {
  try {
    const cart = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty or invalid",
      });
    }
    const productIds = cart.map((item: any) => item.id);
    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "category"
    );
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found in the cart",
      });
    }
    // Combine product data with the quantity from the request
    const productsWithQuantity = products.map((product) => {
      const matchedItem = cart.find(
        (item) => item.id === product._id.toString()
      );
      return {
        ...product.toObject(),
        quantity: matchedItem ? matchedItem.quantity : 0,
      };
    });
    res.status(200).json(productsWithQuantity);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get wishlist products
export const getWishlistProducts: RequestHandler = async (req, res) => {
  try {
    const wishlist = req.body;
    if (!wishlist || !Array.isArray(wishlist) || wishlist.length === 0) {
      return res.status(400).json({
        message: "Wishlist is empty or invalid",
      });
    }
    const productIds = wishlist.map((item: any) => item._id);
    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "category"
    );
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found in the wishlist",
      });
    }
    res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate({
        path: "reviews.user",
        select: "_id firstName lastName email image",
      });
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get similar products
export const getSimilarProducts: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .sort({ createdAt: -1 })
      .limit(3);
    if (!similarProducts || similarProducts.length === 0) {
      return res.status(404).json({
        message: "No similar products found",
      });
    }
    res.status(200).json(similarProducts);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE A NEW PRODUCT
export const newProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const foundProductName = await Product.findOne({
      name: req.body.name,
    });
    if (foundProductName) {
      return res.status(400).json({
        message: "This product already exists, Try another name",
      });
    }
    const {
      name,
      description,
      brand,
      price,
      discount,
      countInStock,
      category,
      features,
    } = req.body;
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !countInStock ||
      !category ||
      !features
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (discount < 0) {
      return res.status(400).json({
        message: "Discount cannot be negative",
      });
    }
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(discount || "0");

    if (parsedDiscount > parsedPrice) {
      return res.status(400).json({
        message: "Discount cannot be more than price",
      });
    }
    if (countInStock < 0) {
      return res.status(400).json({
        message: "Count in stock cannot be negative",
      });
    }
    const product = new Product({
      name,
      slug: slugify(name, {
        replacement: "-",
        lower: true,
        strict: true,
      }),
      description,
      brand,
      price,
      discount,
      countInStock,
      category,
      features,
      images: req.body.imgnames,
      seller: req.user._id,
    });
    await product.save();
    res.status(201).json({
      message: "Product Created Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update product
export const updateProduct: RequestHandler = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findOne({ slug: req.params.slug }).session(
      session
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.body.name && req.body.name !== product.name) {
      const foundProductName = await Product.findOne({
        name: { $regex: `^${req.body.name}$`, $options: "i" },
        _id: { $ne: product._id },
      }).session(session);
      if (foundProductName) {
        return res
          .status(400)
          .json({ message: "This product already exists, try another name" });
      }
    }

    const requiredFields = [
      "name",
      "description",
      "brand",
      "price",
      "countInStock",
      "category",
    ];
    const missingField = requiredFields.find(
      (field) => req.body[field] == null
    );
    if (missingField) {
      return res
        .status(400)
        .json({ message: `Please enter the ${missingField}` });
    }

    const {
      name,
      description,
      brand,
      price,
      discount = 0,
      countInStock,
      category,
      features = [],
      imgnames = [],
      removeImages = [],
    } = req.body;

    if (price < 0)
      return res.status(400).json({ message: "Price cannot be negative" });
    if (discount < 0)
      return res.status(400).json({ message: "Discount cannot be negative" });
    if (discount > price)
      return res
        .status(400)
        .json({ message: "Discount cannot be more than price" });
    if (countInStock < 0)
      return res
        .status(400)
        .json({ message: "Count in stock cannot be negative" });

    let updatedImages = product.images || [];

    if (Array.isArray(removeImages) && removeImages.length > 0) {
      updatedImages = updatedImages.filter(
        (img) => !removeImages.includes(img)
      );
      for (const image of removeImages) {
        const imagePath = path.resolve(
          __dirname,
          "../../uploads/images",
          image
        );
        fs.promises.unlink(imagePath).catch((err) => {
          return res.status(500).json({
            message: `Failed to delete image (${image}): ${err.message}`,
          });
        });
      }
    }

    if (Array.isArray(imgnames) && imgnames.length > 0) {
      updatedImages.push(...imgnames);
    }

    const updatedProductData: any = {
      name,
      slug: slugify(name, { replacement: "-", lower: true, strict: true }),
      description,
      brand,
      price,
      discount,
      countInStock,
      category,
      features,
      images: updatedImages,
    };

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: updatedProductData },
      { new: true, session }
    );
    await session.commitTransaction();
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete product
export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    // Remove product images from the filesystem
    if (Array.isArray(product.images) && product.images.length > 0) {
      for (const image of product.images) {
        const productImagePath = path.resolve(
          __dirname,
          "../../uploads/images",
          image
        );
        fs.promises.unlink(productImagePath).catch((err) => {
          console.warn(`Failed to delete image (${image}):`, err.message);
        });
      }
    }
    // Delete the product from the database
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Create a new product review
export const createReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { slug } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        message: "Rating and comment are required",
      });
    }

    // Check if user has already reviewed
    const alreadyReviewed = product.reviews?.some(
      (review: any) => review.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "Product already reviewed by this user" });
    }

    const newReview = {
      user: userId,
      rating: Number(rating),
      comment: String(comment),
      createdAt: new Date(),
    };

    product.reviews?.push(newReview as any);
    await product.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Search product
export const SearchProduct: RequestHandler = async (req, res) => {
  try {
    const { search } = req.query;
    let filter: any = {};
    if (search) {
      const categoryDoc = await Category.findOne({
        title: { $regex: search, $options: "i" },
      });

      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
        ];
      }
    }
    const products = await Product.find(filter).populate("category");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
