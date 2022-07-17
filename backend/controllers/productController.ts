import { RequestHandler } from "express";
import Product from "../models/product";

// GET ALL PRODUCTS
export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch(error) {
    res.send(error);
  }
}

// GET SINGLE PRODUCT
export const getSingleProduct: RequestHandler = async (req, res) => {
  const product = Product.findById(req.params.id);
  if (product) {
    res.send(product)
  } else {
    res.status(404).json({
      message: 'Product Not Found'
    });
  }
}
