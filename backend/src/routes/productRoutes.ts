import { RequestHandler, Router } from "express";
import {
  createReview,
  deleteProduct,
  getAllProducts,
  getBestSellersByCategory,
  getBestSellingCategories,
  getBestSellingProducts,
  getCartProducts,
  getSimilarProducts,
  getSingleProduct,
  getWishlistProducts,
  newProduct,
  SearchProduct,
  updateProduct,
} from "../controllers/productController";
import { upload } from "../middlewares/multer";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";

const productRouter = Router();

// CREATE NEW PRODUCT
productRouter.post(
  "/new",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  upload.array("images", 6),
  (req, res) => newProduct(req as AuthenticatedRequest, res)
);

// UPDATE PRODUCT
productRouter.put(
  "/:slug/update",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  upload.array("images", 6),
  updateProduct
);

// DELETE PRODUCT
productRouter.delete(
  "/:id/delete",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  deleteProduct
);

// SEARCH PRODUCT
productRouter.get("/", SearchProduct);

// GET ALL PRODUCTS
productRouter.get("/all", getAllProducts);

// Get best selling products
productRouter.get("/bestsellers/list", getBestSellingProducts);

// Get best selling products by category
productRouter.get("/bestsellers/bycategory", getBestSellersByCategory);

// Get best selling categories
productRouter.get("/bestsellers/categories", getBestSellingCategories);

// GET CART PRODUCTS
productRouter.post("/cart", getCartProducts);

// Get wishlist products
productRouter.post("/wishlist", getWishlistProducts);

// GET SINGLE PRODUCT
productRouter.get("/:slug", getSingleProduct);

// GET SIMILAR PRODUCTS
productRouter.get("/:slug/similar", getSimilarProducts);

// Create a new product reveiw
productRouter.post("/:slug/review", isAuth as RequestHandler, (req, res) =>
  createReview(req as AuthenticatedRequest, res)
);

export default productRouter;
