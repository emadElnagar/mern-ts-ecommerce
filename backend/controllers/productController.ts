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
