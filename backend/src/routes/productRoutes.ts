import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getSimilarProducts,
  getSingleProduct,
  newProduct,
  SearchProduct,
  updateProduct,
} from "../controllers/productController";
import { upload } from "../middlewares/multer";

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get("/all", getAllProducts);

// GET SINGLE PRODUCT
productRouter.get("/:slug", getSingleProduct);

// GET SIMILAR PRODUCTS
productRouter.get("/:slug/similar", getSimilarProducts);

// CREATE NEW PRODUCT
productRouter.post("/new", upload.array("images", 6), newProduct);

// UPDATE PRODUCT
productRouter.put("/slug/update", upload.array("images", 6), updateProduct);

// DELETE PRODUCT
productRouter.delete("/:id/delete", deleteProduct);

// SEARCH PRODUCT
productRouter.get("/", SearchProduct);

export default productRouter;
