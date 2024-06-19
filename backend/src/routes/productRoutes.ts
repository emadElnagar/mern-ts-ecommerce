import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productController";
import { upload } from "../middlewares/multer";

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get("/all", getAllProducts);

// GET SINGLE PRODUCT
productRouter.get("/:slug", getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post("/new", upload.array("product", 6), newProduct);

// UPDATE PRODUCT
productRouter.put("/:id/update", updateProduct);

// DELETE PRODUCT
productRouter.delete("/:id/delete", deleteProduct);

export default productRouter;
