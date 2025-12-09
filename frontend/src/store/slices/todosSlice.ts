import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoFilterStatus, TodoSortBy, SortOrder } from '../../types';
import { todosApi } from '../../services/api';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async ({ status, sortBy, order }: { status?: TodoFilterStatus; sortBy?: TodoSortBy; order?: SortOrder }) => {
    return await todosApi.getAll(status, sortBy, order);
  }
);

export const createTodo = createAsyncThunk(
  'todos/create',
  async (data: CreateTodoDto) => {
    return await todosApi.create(data);
  }
);

export const updateTodo = createAsyncThunk(
  'todos/update',
  async ({ id, data }: { id: string; data: UpdateTodoDto }) => {
    return await todosApi.update(id, data);
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id: string) => {
    await todosApi.delete(id);
    return id;
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async (id: string) => {
    return await todosApi.toggle(id);
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch todos
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      });

    // Create todo
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create todo';
      });

    // Update todo
    builder
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update todo';
      });

    // Delete todo
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete todo';
      });

    // Toggle todo
    builder
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle todo';
      });
  },
});

export default todosSlice.reducer;

