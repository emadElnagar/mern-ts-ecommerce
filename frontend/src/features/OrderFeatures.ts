import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.REACT_APP_ORDER_URL;

export interface Order {
  _id: object;
  customer: object;
  orderItems: Array<{
    product: object;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    phone2?: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  shippingStatus?: string;
  deliveredAt?: Date;
}

interface OrderState {
  orders: Order[];
  userOrders?: Order[];
  order: Order | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: OrderState = {
  orders: [],
  userOrders: [],
  order: null,
  isLoading: false,
  error: null,
};

// Create a new order
export const CreateOrder: any = createAsyncThunk(
  "orders/create",
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${url}`, orderData, config);
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

// Get all orders
export const GetAllOrders: any = createAsyncThunk(
  "orders/all",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${url}`, config);
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

// Get user orders
export const GetUserOrders: any = createAsyncThunk(
  "orders/user",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${url}/user`, config);
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

const orderSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new order
      .addCase(CreateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders.push(action.payload);
        state.order = action.payload;
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get all orders
      .addCase(GetAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(GetAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get user orders
      .addCase(GetUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userOrders = action.payload;
      })
      .addCase(GetUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
