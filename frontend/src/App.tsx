import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCategories } from './store/slices/categoriesSlice';
import { fetchTodos } from './store/slices/todosSlice';
import TodoList from './components/TodoList';
import CategoryManager from './components/CategoryManager';
import FiltersAndSort from './components/FiltersAndSort';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { status, sortBy, order } = useAppSelector((state) => state.filters);
  const { loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { loading: todosLoading } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodos({ status, sortBy, order }));
  }, [dispatch, status, sortBy, order]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Todo Application</h1>
        <p>Manage your tasks across multiple categories</p>
      </header>

      <main className="app-main">
        <div className="app-container">
          <div className="app-sidebar">
            <CategoryManager />
          </div>

          <div className="app-content">
            <div className="app-controls">
              <TodoForm />
              <FiltersAndSort />
            </div>

            {categoriesLoading || todosLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <TodoList />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

