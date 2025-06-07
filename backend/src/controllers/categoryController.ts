import { RequestHandler } from "express";
import Category from "../models/category";
import { AuthenticatedRequest } from "../types/authTypes";
import { Response } from "express";

// Create a new category
export const newCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const foundCategoryTitle = await Category.findOne({
      title: req.body.title,
    });
    if (foundCategoryTitle) {
      return res.status(400).json({
        message: "This category already exists, Try another name",
      });
    }
    interface newCategory {
      title: string;
      author: string;
    }
    const category = new Category<newCategory>({
      title: req.body.title,
      author: req.user._id,
    });
    await category.save();
    res.status(200).json({
      message: "Category created successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all categories
export const getAllCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update category
export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const newCategory = {
      title: req.body.title,
    };
    const foundCategory = await Category.findOne({
      title: req.body.title,
      _id: { $ne: req.params.id },
    });
    if (foundCategory) {
      return res.status(400).json({
        message: "This category already exists, Try another name",
      });
    }
    if (
      !req.body.title ||
      typeof req.body.title !== "string" ||
      !req.body.title.trim()
    ) {
      return res.status(400).json({ message: "Invalid category title" });
    }
    await Category.updateOne({ _id: req.params.id }, { $set: newCategory });
    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete category
export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
