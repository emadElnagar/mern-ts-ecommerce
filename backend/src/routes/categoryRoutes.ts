import { Router } from "express";
import {
  deleteCategory,
  getAllCategories,
  newCategory,
  updateCategory,
} from "../controllers/categoryController";
import { isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";
import { RequestHandler } from "express-serve-static-core";

const categoryRouter = Router();

// Create a new category
categoryRouter.post("/new", isAuth as RequestHandler, (req, res) =>
  newCategory(req as AuthenticatedRequest, res)
);

// Get all categories
categoryRouter.get("/all", getAllCategories);

// Update category
categoryRouter.patch("/:id/update", updateCategory);

// Delete category
categoryRouter.delete("/:id/delete", deleteCategory);

export default categoryRouter;
