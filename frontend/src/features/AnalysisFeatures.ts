import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ANALYSIS_API_URL } from "../API";

interface BestSellingProduct {
  product: any;
  category: any;
  totalSold: number;
}

interface OrderStats {
  ordersLast30Days: number;
  ordersLast90Days: number;
  ordersLastYear: number;
  totalOrders: number;
}

interface IncomeStats {
  incomeLast30Days: number;
  incomeLast90Days: number;
  incomeLastYear: number;
  totalIncome: number;
}

interface AnalysisState {
  topProducts: {
    last30Days: BestSellingProduct[];
    last90Days: BestSellingProduct[];
    lastYear: BestSellingProduct[];
  };
  topProductsByCategory: Record<string, any[]>;
  topCategories: any[];
  orders: OrderStats;
  income: IncomeStats;
  ordersByStatus: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  topProducts: {
    last30Days: [],
    last90Days: [],
    lastYear: [],
  },
  topProductsByCategory: {},
  topCategories: [],
  orders: {
    ordersLast30Days: 0,
    ordersLast90Days: 0,
    ordersLastYear: 0,
    totalOrders: 0,
  },
  income: {
    incomeLast30Days: 0,
    incomeLast90Days: 0,
    incomeLastYear: 0,
    totalIncome: 0,
  },
  ordersByStatus: [],
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
  "analysis/BestSellersCategories",
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

// Get order statistics
export const fetchOrderStats = createAsyncThunk(
  "analysis/OrderStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${ANALYSIS_API_URL}/count`, config);
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

// Get orders income
export const fetchOrderIncome = createAsyncThunk(
  "analysis/OrderIncome",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${ANALYSIS_API_URL}/income`, config);
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
      })
      // Get order statistics
      .addCase(fetchOrderStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get orders income
      .addCase(fetchOrderIncome.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload;
      })
      .addCase(fetchOrderIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default analysisSlice.reducer;
