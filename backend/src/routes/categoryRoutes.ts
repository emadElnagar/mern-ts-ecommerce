import { Router } from 'express';
import { newCategory } from '../controllers/categoryController';
const categoryRouter  = Router();

categoryRouter.post('/new', newCategory);

export default categoryRouter;
