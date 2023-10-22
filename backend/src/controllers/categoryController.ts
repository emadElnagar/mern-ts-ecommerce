import { RequestHandler } from "express";
import Category from "../models/category";

export const newCategory: RequestHandler = async (req, res) => {
  const founcCategoryTitle = await Category.findOne({ title: req.params.title });
  if (founcCategoryTitle) {
    res.json({ message: 'This category already exists, Try another name' });
  }
  interface newCategory {
    title: string,
    author: object,
  }
  const category = new Category<newCategory>({
    title: req.body.title,
    author: req.body.author
  });
  category.save().then(category => {
    res.status(200).json({
      _id: category._id,
      title: category.title,
      author: category.author
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}
