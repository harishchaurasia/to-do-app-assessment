import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from '../controllers/todoController';
import {
  validateCreateTodo,
  validateUpdateTodo,
} from '../middleware/validation';

const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', validateCreateTodo, createTodo);
router.put('/:id', validateUpdateTodo, updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;

