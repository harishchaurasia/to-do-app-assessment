import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createCategory, deleteCategory } from '../store/slices/categoriesSlice';
import './CategoryManager.css';

function CategoryManager() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      await dispatch(createCategory({ name: name.trim(), color })).unwrap();
      setName('');
      setColor('#3b82f6');
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"? All todos in this category will also be deleted.`)) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
      } catch (err) {
        console.error('Failed to delete category:', err);
      }
    }
  };

  return (
    <div className="category-manager">
      <h2>Categories</h2>

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div
              className="category-color-indicator"
              style={{ backgroundColor: category.color }}
            ></div>
            <span className="category-name">{category.name}</span>
            <button
              onClick={() => handleDelete(category.id, category.name)}
              className="btn-delete-category"
              title="Delete category"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <form className="category-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              maxLength={50}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryColor">Color</label>
            <div className="color-input-group">
              <input
                type="color"
                id="categoryColor"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#3b82f6"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setName('');
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-primary btn-full"
          onClick={() => setShowForm(true)}
        >
          + New Category
        </button>
      )}
    </div>
  );
}

export default CategoryManager;

