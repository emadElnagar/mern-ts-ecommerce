import { RequestHandler } from "express";
import Product from "../models/product";
import slugify from "slugify";
import mongoose from "mongoose";
import Category from "../models/category";

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
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({
      message: "Product Not Found",
    });
  }
};

// Get similar products
export const getSimilarProducts: RequestHandler = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  const similarProducts = (
    await Product.find({ category: product?.category })
      .sort({ createdAt: -1 })
      .limit(3)
  ).filter((item) => item.slug !== product?.slug);
  if (!similarProducts) return;
  res.send(similarProducts);
};

// CREATE A NEW PRODUCT
export const newProduct: RequestHandler = async (req, res) => {
  // Unique product name
  const foundProductName = await Product.findOne({ name: req.body.name });
  if (foundProductName) {
    res.json({ message: "This product already exists, Try another name" });
  }
  interface newProduct {
    name: string;
    slug: string;
    description: string;
    brand: string;
    price: number;
    discount: number;
    countInStock: number;
    images: string | undefined;
    category: object;
    seller: object;
  }
  const product = new Product<newProduct>({
    name: req.body.name,
    slug: slugify(req.body.name, {
      replacement: "-",
      lower: true,
      strict: true,
    }),
    description: req.body.description,
    brand: req.body.brand,
    price: req.body.price,
    discount: req.body.discount,
    countInStock: req.body.countInStock,
    images: req.body.imgnames,
    category: req.body.category,
    seller: req.body.seller,
  });
  product
    .save()
    .then((_product) => {
      res.status(200).json({
        message: "Product Created Successfully",
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: err.message,
      });
    });
};

// Update product
export const updateProduct: RequestHandler = async (req, res) => {
  const newProduct = {
    name: req.body.name,
    slug: slugify(req.body.name, {
      replacement: "-",
      lower: true,
      strict: true,
    }),
    description: req.body.description,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    images: req.body.imgnames,
    rating: req.body.rating,
    category: req.body.category,
  };
  Product.updateOne({ slug: req.params.slug }, { $set: newProduct })
    .then((_result) => {
      res.status(200).json({
        message: "Product updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: error.message,
      });
    });
};

// Delete product
export const deleteProduct: RequestHandler = async (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((_result) => {
      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error deleting product" + error.message,
      });
    });
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
