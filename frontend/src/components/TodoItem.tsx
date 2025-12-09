import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteTodo, toggleTodo, fetchTodos } from '../store/slices/todosSlice';
import { Todo } from '../types';
import TodoForm from './TodoForm';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const { status, sortBy, order } = useAppSelector((state) => state.filters);
  const [isEditing, setIsEditing] = useState(false);

  const category = categories.find((cat) => cat.id === todo.categoryId);

  const handleToggle = async () => {
    try {
      await dispatch(toggleTodo(todo.id)).unwrap();
      // Refetch todos to apply current filters and sorting
      dispatch(fetchTodos({ status, sortBy, order }));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await dispatch(deleteTodo(todo.id)).unwrap();
        // Refetch todos to apply current filters and sorting
        dispatch(fetchTodos({ status, sortBy, order }));
      } catch (err) {
        console.error('Failed to delete todo:', err);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = !todo.completed && new Date(todo.dueDate) < new Date();

  if (isEditing) {
    return (
      <div className="todo-item-edit">
        <TodoForm todo={todo} onCancel={handleCancelEdit} />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-item-header">
        <div className="todo-checkbox-wrapper">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-checkbox"
          />
          <h4 className="todo-title">{todo.title}</h4>
        </div>
        <div className="todo-actions">
          <button onClick={handleEdit} className="btn-icon" title="Edit">
            ✏️
          </button>
          <button onClick={handleDelete} className="btn-icon btn-delete" title="Delete">
            🗑️
          </button>
        </div>
      </div>

      <p className="todo-description">{todo.description}</p>

      <div className="todo-meta">
        <span className={`todo-due-date ${isOverdue ? 'overdue-text' : ''}`}>
          📅 Due: {formatDate(todo.dueDate)}
        </span>
        {category && (
          <span
            className="todo-category-badge"
            style={{ backgroundColor: category.color + '20', color: category.color }}
          >
            {category.name}
          </span>
        )}
      </div>
    </div>
  );
}

export default TodoItem;

