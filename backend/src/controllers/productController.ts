import { RequestHandler } from "express";
import Product from "../models/product";
import slugify from "slugify";

// GET ALL PRODUCTS
export const getAllProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.send(error);
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct: RequestHandler = async (req, res) => {
  const product = Product.findOne({ slug: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({
      message: "Product Not Found",
    });
  }
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
    countInStock: req.body.countInStock,
    images: req.file?.filename,
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
    images: req.body.images,
    rating: req.body.rating,
    category: req.body.category,
  };
  Product.updateOne({ _id: req.params.id }, { $set: newProduct })
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
