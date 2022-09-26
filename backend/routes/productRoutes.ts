import { Router } from "express";
import { getAllProducts, getSingleProduct, newProduct } from '../controllers/productController';

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:id', getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post('/new', newProduct);

export default productRouter;
