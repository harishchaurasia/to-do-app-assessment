import { Request, Response, NextFunction } from 'express';
import { db } from '../models/database';
import { AppError } from '../middleware/errorHandler';
import { CreateTodoDto, UpdateTodoDto, TodoFilterStatus, TodoSortBy } from '../types';

export const getAllTodos = (req: Request, res: Response, next: NextFunction) => {
  try {
    let todos = db.getAllTodos();

    // Filter by status
    const status = (req.query.status as TodoFilterStatus) || 'all';
    if (status === 'active') {
      todos = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      todos = todos.filter(todo => todo.completed);
    }

    // Sort
    const sortBy = (req.query.sortBy as TodoSortBy) || 'createdAt';
    const order = (req.query.order as 'asc' | 'desc') || 'desc';

    todos.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        comparison = dateA - dateB;
      } else if (sortBy === 'createdAt') {
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
      }

      return order === 'asc' ? comparison : -comparison;
    });

    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = db.getTodoById(id);

    if (!todo) {
      throw new AppError('Todo not found', 404);
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoData = req.body as CreateTodoDto;

    // Validate category exists
    const category = db.getCategoryById(todoData.categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const todo = db.createTodo({
      title: todoData.title.trim(),
      description: todoData.description.trim(),
      dueDate: todoData.dueDate,
      categoryId: todoData.categoryId,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body as UpdateTodoDto;

    // Validate category exists if categoryId is being updated
    if (updates.categoryId) {
      const category = db.getCategoryById(updates.categoryId);
      if (!category) {
        throw new AppError('Category not found', 404);
      }
    }

    const updatedData: Partial<{
      title: string;
      description: string;
      dueDate: string;
      categoryId: string;
      completed: boolean;
    }> = {};

    if (updates.title !== undefined) {
      updatedData.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      updatedData.description = updates.description.trim();
    }
    if (updates.dueDate !== undefined) {
      updatedData.dueDate = updates.dueDate;
    }
    if (updates.categoryId !== undefined) {
      updatedData.categoryId = updates.categoryId;
    }
    if (updates.completed !== undefined) {
      updatedData.completed = updates.completed;
    }

    const todo = db.updateTodo(id, updatedData);

    if (!todo) {
      throw new AppError('Todo not found', 404);
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteTodo(id);

    if (!deleted) {
      throw new AppError('Todo not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const toggleTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = db.toggleTodo(id);

    if (!todo) {
      throw new AppError('Todo not found', 404);
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

