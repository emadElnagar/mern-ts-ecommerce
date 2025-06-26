import { RequestHandler } from "express";
import Product from "../models/product";
import slugify from "slugify";
import Category from "../models/category";
import { Response } from "express";
import { AuthenticatedRequest } from "../types/authTypes";
import path from "path";
import fs from "fs";

// GET ALL PRODUCTS
export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category"
    );
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
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    const foundProductName = await Product.findOne({
      name: req.body.name,
      _id: { $ne: product._id },
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
    if (discount > price) {
      return res.status(400).json({
        message: "Discount cannot be more than price",
      });
    }
    if (countInStock < 0) {
      return res.status(400).json({
        message: "Count in stock cannot be negative",
      });
    }
    // Update product in the database
    const updatedProduct = {
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
    };
    await Product.updateOne(
      { slug: req.params.slug },
      { $set: updatedProduct }
    );
    // Remove old images from the filesystem
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
    res.status(200).json({
      message: "Product Updated Successfully",
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
