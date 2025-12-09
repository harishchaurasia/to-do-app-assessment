import { Request, Response, NextFunction } from 'express';
import { db } from '../models/database';
import { AppError } from '../middleware/errorHandler';
import { CreateCategoryDto, UpdateCategoryDto } from '../types';

export const getAllCategories = (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = db.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = db.getCategoryById(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = req.body as CreateCategoryDto;
    const category = db.createCategory({
      name: categoryData.name.trim(),
      color: categoryData.color,
    });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body as UpdateCategoryDto;

    const updatedData: Partial<{ name: string; color: string }> = {};
    if (updates.name !== undefined) {
      updatedData.name = updates.name.trim();
    }
    if (updates.color !== undefined) {
      updatedData.color = updates.color;
    }

    const category = db.updateCategory(id, updatedData);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteCategory(id);

    if (!deleted) {
      throw new AppError('Category not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

