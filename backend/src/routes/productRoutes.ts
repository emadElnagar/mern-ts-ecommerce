import { Router } from "express";
import { deleteProduct, getAllProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/productController';

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/all', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:slug', getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post('/new', newProduct);

// UPDATE PRODUCT
productRouter.post('/:id/update', updateProduct);

// DELETE PRODUCT
productRouter.delete('/:id/delete', deleteProduct);

export default productRouter;
