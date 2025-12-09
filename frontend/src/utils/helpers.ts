import { Todo, Category } from '../types';

export function groupTodosByCategory(todos: Todo[], categories: Category[]) {
  const categoryMap = new Map<string, Category>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat));

  const grouped = new Map<string, Todo[]>();

  todos.forEach((todo) => {
    const categoryId = todo.categoryId;
    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, []);
    }
    grouped.get(categoryId)!.push(todo);
  });

  return Array.from(grouped.entries())
    .map(([categoryId, todos]) => ({
      categoryId,
      category: categoryMap.get(categoryId) || {
        id: categoryId,
        name: 'Unknown Category',
        color: '#999',
        createdAt: '',
      },
      todos,
    }))
    .filter((group) => group.todos.length > 0)
    .sort((a, b) => a.category.name.localeCompare(b.category.name));
}

