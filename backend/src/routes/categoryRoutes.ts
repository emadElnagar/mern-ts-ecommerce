import { Router } from 'express';
import { getAllCategories, newCategory } from '../controllers/categoryController';
const categoryRouter  = Router();

categoryRouter.post('/new', newCategory);

categoryRouter.post('/all', getAllCategories);

export default categoryRouter;
