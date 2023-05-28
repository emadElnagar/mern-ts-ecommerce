import { Router } from "express";
import { getAllProducts, getSingleProduct, newProduct } from '../controllers/productController';
import { updateUserName } from "../controllers/userControllers";

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/', getAllProducts);

// GET SINGLE PRODUCT
productRouter.get('/:id', getSingleProduct);

// CREATE NEW PRODUCT
productRouter.post('/new', newProduct);

// UPDATE USER FIRST AND LAST NAME
productRouter.get('/:id/update/name', updateUserName);

export default productRouter;
