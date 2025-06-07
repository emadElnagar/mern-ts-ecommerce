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
      images,
      countInStock,
      category,
    } = req.body;
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !countInStock ||
      !category
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
      images,
      countInStock,
      category,
    } = req.body;
    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !countInStock ||
      !category ||
      !images
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
      images: req.body.imgnames,
    };
    await Product.updateOne(
      { slug: req.params.slug },
      { $set: updatedProduct }
    );
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
