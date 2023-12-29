import { Router } from "express";
import { deleteProduct, getAllProducts, getSingleProduct, newProduct } from '../controllers/productController';

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/all', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:slug', getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post('/new', newProduct);

// DELETE PRODUCT
productRouter.post('/:id/delete', deleteProduct);

export default productRouter;
