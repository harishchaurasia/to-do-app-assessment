import { Category, Todo, CreateCategoryDto, UpdateCategoryDto, CreateTodoDto, UpdateTodoDto, TodoFilterStatus, TodoSortBy, SortOrder } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch categories');
    }
    return response.json();
  },

  getById: async (id: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch category');
    }
    return response.json();
  },

  create: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create category');
    }
    return response.json();
  },

  update: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update category');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete category');
    }
  },
};

// Todos API
export const todosApi = {
  getAll: async (status?: TodoFilterStatus, sortBy?: TodoSortBy, order?: SortOrder): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    const url = `${API_BASE_URL}/todos${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch todos');
    }
    return response.json();
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch todo');
    }
    return response.json();
  },

  create: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create todo');
    }
    return response.json();
  },

  update: async (id: string, data: UpdateTodoDto): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update todo');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete todo');
    }
  },

  toggle: async (id: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to toggle todo');
    }
    return response.json();
  },
};

