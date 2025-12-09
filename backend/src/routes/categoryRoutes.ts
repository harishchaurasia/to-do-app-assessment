import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../middleware/validation';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', validateCreateCategory, createCategory);
router.put('/:id', validateUpdateCategory, updateCategory);
router.delete('/:id', deleteCategory);

export default router;

