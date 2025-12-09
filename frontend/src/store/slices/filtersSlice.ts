import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoFilterStatus, TodoSortBy, SortOrder } from '../../types';

interface FiltersState {
  status: TodoFilterStatus;
  sortBy: TodoSortBy;
  order: SortOrder;
}

const initialState: FiltersState = {
  status: 'all',
  sortBy: 'createdAt',
  order: 'desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TodoFilterStatus>) => {
      state.status = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TodoSortBy>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
  },
});

export const { setStatus, setSortBy, setOrder } = filtersSlice.actions;
export default filtersSlice.reducer;

