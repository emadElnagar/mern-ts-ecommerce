import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ANALYSIS_API_URL } from "../API";

interface AnalysisState {
  topProducts: [] | null;
  topProductsByCategory?: [] | null;
  topCategories?: [] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  topProducts: null,
  topProductsByCategory: null,
  topCategories: null,
  isLoading: false,
  error: null,
};

// Fetch top products by category
export const fetchTopProducts = createAsyncThunk(
  "analysis/TopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ANALYSIS_API_URL}/bestsellers/list`);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Get best sellers by category
export const fetchBestSellersByCategory = createAsyncThunk(
  "analysis/BestSellersByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ANALYSIS_API_URL}/bestsellers/category`
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Get best selling categories
export const fetchBestCategories = createAsyncThunk(
  "analysis/BestSellersByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ANALYSIS_API_URL}/bestsellers/categories`
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get best seller products
      .addCase(fetchTopProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get best sellers by category
      .addCase(fetchBestSellersByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBestSellersByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topProductsByCategory = action.payload;
      })
      .addCase(fetchBestSellersByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get best selling categories
      .addCase(fetchBestCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBestCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topCategories = action.payload;
      })
      .addCase(fetchBestCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default analysisSlice.reducer;
