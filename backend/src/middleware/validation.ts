import { Request, Response, NextFunction } from 'express';
import { CreateCategoryDto, CreateTodoDto, UpdateCategoryDto, UpdateTodoDto } from '../types';

export const validateCreateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name, color } = req.body as CreateCategoryDto;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Category name is required and must be a non-empty string' });
  }

  if (name.trim().length > 50) {
    return res.status(400).json({ error: 'Category name must be 50 characters or less' });
  }

  if (!color || typeof color !== 'string' || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return res.status(400).json({ error: 'Valid color hex code is required (e.g., #3b82f6)' });
  }

  next();
};

export const validateUpdateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name, color } = req.body as UpdateCategoryDto;

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Category name must be a non-empty string' });
    }
    if (name.trim().length > 50) {
      return res.status(400).json({ error: 'Category name must be 50 characters or less' });
    }
  }

  if (color !== undefined) {
    if (typeof color !== 'string' || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({ error: 'Valid color hex code is required (e.g., #3b82f6)' });
    }
  }

  next();
};

export const validateCreateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, dueDate, categoryId } = req.body as CreateTodoDto;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Todo title is required and must be a non-empty string' });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({ error: 'Todo title must be 200 characters or less' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Todo description is required and must be a string' });
  }

  if (description.length > 1000) {
    return res.status(400).json({ error: 'Todo description must be 1000 characters or less' });
  }

  if (!dueDate || typeof dueDate !== 'string') {
    return res.status(400).json({ error: 'Due date is required and must be a string' });
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dueDate)) {
    return res.status(400).json({ error: 'Due date must be in YYYY-MM-DD format' });
  }

  // Validate date is valid
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date provided' });
  }

  if (!categoryId || typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Category ID is required and must be a string' });
  }

  next();
};

export const validateUpdateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, dueDate, categoryId, completed } = req.body as UpdateTodoDto;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Todo title must be a non-empty string' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Todo title must be 200 characters or less' });
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string') {
      return res.status(400).json({ error: 'Todo description must be a string' });
    }
    if (description.length > 1000) {
      return res.status(400).json({ error: 'Todo description must be 1000 characters or less' });
    }
  }

  if (dueDate !== undefined) {
    if (typeof dueDate !== 'string') {
      return res.status(400).json({ error: 'Due date must be a string' });
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDate)) {
      return res.status(400).json({ error: 'Due date must be in YYYY-MM-DD format' });
    }
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid date provided' });
    }
  }

  if (categoryId !== undefined && typeof categoryId !== 'string') {
    return res.status(400).json({ error: 'Category ID must be a string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  next();
};

