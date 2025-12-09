import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTodo, updateTodo, fetchTodos } from '../store/slices/todosSlice';
import { Todo } from '../types';
import './TodoForm.css';

interface TodoFormProps {
  todo?: Todo;
  onCancel?: () => void;
}

function TodoForm({ todo, onCancel }: TodoFormProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const { status, sortBy, order } = useAppSelector((state) => state.filters);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
      setCategoryId(todo.categoryId);
    } else {
      // Set default category if available
      if (categories.length > 0 && !categoryId) {
        setCategoryId(categories[0].id);
      }
    }
  }, [todo, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    if (!dueDate) {
      setError('Due date is required');
      return;
    }

    if (!categoryId) {
      setError('Category is required');
      return;
    }

    try {
      if (todo) {
        await dispatch(
          updateTodo({
            id: todo.id,
            data: { title, description, dueDate, categoryId },
          })
        ).unwrap();
        onCancel?.();
      } else {
        await dispatch(
          createTodo({
            title: title.trim(),
            description: description.trim(),
            dueDate,
            categoryId,
          })
        ).unwrap();
        setTitle('');
        setDescription('');
        setDueDate('');
        if (categories.length > 0) {
          setCategoryId(categories[0].id);
        }
      }
      // Refetch todos to apply current filters and sorting
      dispatch(fetchTodos({ status, sortBy, order }));
    } catch (err: any) {
      setError(err.message || 'Failed to save todo');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>{todo ? 'Edit Todo' : 'Create New Todo'}</h3>
      
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {todo ? 'Update Todo' : 'Create Todo'}
        </button>
        {todo && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;

