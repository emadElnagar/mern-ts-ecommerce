import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDERS_API_URL } from "../API";

const url = ORDERS_API_URL;

export interface Order {
  _id: object;
  orderNumber: string;
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
    paidAt?: Date;
  };
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
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
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${url}/create`, orderData, config);
      localStorage.removeItem("cart");
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
      const token = sessionStorage.getItem("token");
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
      const token = sessionStorage.getItem("token");
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

// Get specific order
export const GetOrder: any = createAsyncThunk(
  "orders/get",
  async (_id: string, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${url}/${_id}`, config);
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

// Update order status
export const UpdateOrderStatus: any = createAsyncThunk(
  "orders/updateStatus",
  async (
    { _id, status }: { _id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/${_id}/status`,
        { status },
        config
      );
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Update order payment status
export const UpdateOrderPaymentStatus: any = createAsyncThunk(
  "orders/updatePaymentStatus",
  async (
    { _id, paymentResult }: { _id: string; paymentResult: string },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/${_id}/payment`,
        { paymentStatus: paymentResult },
        config
      );
      console.log("payment", paymentResult);
      console.log("response.data", response.data);
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

// Cancel order
export const CancelOrder: any = createAsyncThunk(
  "orders/cancel",
  async (_id: string, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(`${url}/${_id}/cancel`, {}, config);
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
  name: "order",
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
      })
      // Get specific order
      .addCase(GetOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(GetOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update order status
      .addCase(UpdateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.order && state.order._id === action.payload._id) {
          state.order = action.payload;
        }
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update order payment status
      .addCase(UpdateOrderPaymentStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateOrderPaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.order && state.order._id === action.payload._id) {
          state.order = action.payload;
        }
      })
      .addCase(UpdateOrderPaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Cancel order
      .addCase(CancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.order && state.order._id === action.payload._id) {
          state.order = action.payload;
        }
      })
      .addCase(CancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
