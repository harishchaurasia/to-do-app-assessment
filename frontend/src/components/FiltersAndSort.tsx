import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setStatus, setSortBy, setOrder } from '../store/slices/filtersSlice';
import { TodoFilterStatus, TodoSortBy, SortOrder } from '../types';
import './FiltersAndSort.css';

function FiltersAndSort() {
  const dispatch = useAppDispatch();
  const { status, sortBy, order } = useAppSelector((state) => state.filters);

  const handleStatusChange = (newStatus: TodoFilterStatus) => {
    dispatch(setStatus(newStatus));
  };

  const handleSortChange = (newSortBy: TodoSortBy) => {
    dispatch(setSortBy(newSortBy));
  };

  const handleOrderChange = (newOrder: SortOrder) => {
    dispatch(setOrder(newOrder));
  };

  return (
    <div className="filters-and-sort">
      <div className="filter-group">
        <label>Filter by Status:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${status === 'all' ? 'active' : ''}`}
            onClick={() => handleStatusChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${status === 'active' ? 'active' : ''}`}
            onClick={() => handleStatusChange('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${status === 'completed' ? 'active' : ''}`}
            onClick={() => handleStatusChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="sort-group">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as TodoSortBy)}
          className="sort-select"
        >
          <option value="createdAt">Creation Date</option>
          <option value="dueDate">Due Date</option>
        </select>

        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value as SortOrder)}
          className="sort-select"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersAndSort;

