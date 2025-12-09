export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TodoFilterStatus = 'all' | 'active' | 'completed';
export type TodoSortBy = 'dueDate' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface CreateCategoryDto {
  name: string;
  color: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  completed?: boolean;
}

