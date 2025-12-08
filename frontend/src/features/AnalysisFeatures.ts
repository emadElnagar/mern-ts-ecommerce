import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ANALYSIS_API_URL } from "../API";

interface AnalysisState {
  topProducts: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  topProducts: null,
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

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});
export default analysisSlice.reducer;
