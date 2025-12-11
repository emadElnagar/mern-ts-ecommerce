import { RequestHandler, Router } from "express";
import {
  getAllOrdersIncome,
  getBestSellersByCategory,
  getBestSellingCategories,
  getBestSellingProducts,
  getOrderStats,
} from "../controllers/analysisController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";

const analysisRouter = Router();

// Get best selling products
analysisRouter.get("/bestsellers/list", getBestSellingProducts);

// Get best selling products by category
analysisRouter.get("/bestsellers/category", getBestSellersByCategory);

// Get best selling categories
analysisRouter.get("/bestsellers/categories", getBestSellingCategories);

// Get order statistics
analysisRouter.get(
  "/stats",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => getOrderStats(req as AuthenticatedRequest, res)
);

// Get all orders income
analysisRouter.get(
  "/income",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  async (req, res) => getAllOrdersIncome(req as AuthenticatedRequest, res)
);

export default analysisRouter;
