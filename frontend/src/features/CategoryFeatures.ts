import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/categories';

export interface Category {
  _id?: object;
  title: string;
  author: object;
}

interface CategoryState {
  categories: Category[],
  category: Category | null,
  isLoading: boolean,
  error: object | null
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null
}

// Create a new category
export const NewCategory: any = createAsyncThunk("categories/new", async (category: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/new`, category);
    return response.data;
  } catch (error: any) {    
    return rejectWithValue(error.message);
  }
});

// Get all categories
export const GetAllCategories: any = createAsyncThunk("categories/all",async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/all`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// CATEGORY SLICE
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(NewCategory.pending, (state, _action) =>{
      state.isLoading = true;
    })
    .addCase(NewCategory.fulfilled, (state, action) =>{
      state.isLoading = false;
      state.categories.push(action.payload);
    })
    .addCase(NewCategory.rejected, (state, action) =>{
      state.isLoading = false;
      state.error = action.error;
    })
    .addCase(GetAllCategories.pending, (state, _) => {
      state.isLoading = true;
    })
    .addCase(GetAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories.concat(action.payload);
    })
    .addCase(GetAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default categorySlice.reducer;
