import { Category, Todo } from '../types';

// In-memory database
class Database {
  private categories: Category[] = [];
  private todos: Todo[] = [];
  private categoryIdCounter = 1;
  private todoIdCounter = 1;

  // Initialize with default data
  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default categories
    const defaultCategories = [
      { name: 'Work', color: '#3b82f6' },
      { name: 'Personal', color: '#10b981' },
      { name: 'Shopping', color: '#f59e0b' },
    ];

    defaultCategories.forEach(cat => {
      this.categories.push({
        id: String(this.categoryIdCounter++),
        name: cat.name,
        color: cat.color,
        createdAt: new Date(),
      });
    });
  }

  // Category methods
  getAllCategories(): Category[] {
    return [...this.categories];
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(cat => cat.id === id);
  }

  createCategory(category: Omit<Category, 'id' | 'createdAt'>): Category {
    const newCategory: Category = {
      ...category,
      id: String(this.categoryIdCounter++),
      createdAt: new Date(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) return null;

    this.categories[index] = {
      ...this.categories[index],
      ...updates,
    };
    return this.categories[index];
  }

  deleteCategory(id: string): boolean {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) return false;

    // Also delete todos in this category
    this.todos = this.todos.filter(todo => todo.categoryId !== id);
    this.categories.splice(index, 1);
    return true;
  }

  // Todo methods
  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: String(this.todoIdCounter++),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    this.todos[index] = {
      ...this.todos[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.todos[index];
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  toggleTodo(id: string): Todo | null {
    const todo = this.getTodoById(id);
    if (!todo) return null;
    return this.updateTodo(id, { completed: !todo.completed });
  }
}

export const db = new Database();

