import { Router } from "express";
import { getAllProducts, getSingleProduct } from '../controllers/productController';

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:id', getSingleProduct);

export default productRouter;
