import { Router } from "express";
import {
  getBestSellersByCategory,
  getBestSellingCategories,
  getBestSellingProducts,
} from "../controllers/analysisController";

const analysisRouter = Router();

// Get best selling products
analysisRouter.get("/bestsellers/list", getBestSellingProducts);

// Get best selling products by category
analysisRouter.get("/bestsellers/bycategory", getBestSellersByCategory);

// Get best selling categories
analysisRouter.get("/bestsellers/categories", getBestSellingCategories);

export default analysisRouter;
