import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../../types';
import { categoriesApi } from '../../services/api';

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    return await categoriesApi.getAll();
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: CreateCategoryDto) => {
    return await categoriesApi.create(data);
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }: { id: string; data: UpdateCategoryDto }) => {
    return await categoriesApi.update(id, data);
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: string) => {
    await categoriesApi.delete(id);
    return id;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create category';
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update category';
      });

    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete category';
      });
  },
});

export default categoriesSlice.reducer;

