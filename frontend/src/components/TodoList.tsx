import { useAppSelector } from '../store/hooks';
import TodoItem from './TodoItem';
import { groupTodosByCategory } from '../utils/helpers';
import './TodoList.css';

function TodoList() {
  const { todos } = useAppSelector((state) => state.todos);
  const { categories } = useAppSelector((state) => state.categories);

  const groupedTodos = groupTodosByCategory(todos, categories);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Create your first todo item!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {groupedTodos.map((group) => (
        <div key={group.categoryId} className="todo-category-group">
          <div className="category-header" style={{ borderLeftColor: group.category.color }}>
            <span className="category-name">{group.category.name}</span>
            <span className="category-count">({group.todos.length})</span>
          </div>
          <div className="todos-container">
            {group.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

