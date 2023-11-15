import { Router } from 'express';
import { deleteCategory, getAllCategories, newCategory, updateCategory } from '../controllers/categoryController';
const categoryRouter  = Router();

// Create a new category
categoryRouter.post('/new', newCategory);

// Get all categories
categoryRouter.get('/all', getAllCategories);

// Update category
categoryRouter.put('/:id/update', updateCategory);

// Delete category
categoryRouter.delete('/:id/delete', deleteCategory);

export default categoryRouter;
