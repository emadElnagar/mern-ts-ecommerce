import { Router } from "express";
import { getAllProducts } from '../controllers/productController';

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/', getAllProducts);

export default productRouter;
