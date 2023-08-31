import { Router } from "express";
import { getAllProducts, getSingleProduct, newProduct } from '../controllers/productController';
import { updateUserName } from "../controllers/userControllers";

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:slug', getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post('/new', newProduct);

export default productRouter;
