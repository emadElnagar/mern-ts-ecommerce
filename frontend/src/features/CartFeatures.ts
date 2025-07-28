import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.REACT_APP_CART_URL;

interface product {
  _id: object;
  quantity: number;
}

interface CartState {
  cart: product[];
  isLoading: boolean;
  error: object | null;
}
const initialState: CartState = {
  cart: [],
  isLoading: false,
  error: null,
};

// Add to cart
export const addToCart: any = createAsyncThunk(
  "cart/add",
  async (product: product, { rejectWithValue }) => {
    try {
      const data = {
        id: product._id,
        quantity: product.quantity,
      };
      let foundItems = localStorage.getItem("cart");
      let cartArray = foundItems ? JSON.parse(foundItems) : [];
      let existingItem = cartArray.find(
        (item: { id: object }) => item.id === data.id
      );
      existingItem
        ? (existingItem.quantity += data.quantity)
        : cartArray.push(data);
      localStorage.setItem("cart", JSON.stringify(cartArray));
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Get cart products
export const getCart: any = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const cartArray = localStorage.getItem("cart");
      const cart = cartArray ? JSON.parse(cartArray) : [];
      const response = await axios.post(`${url}`, cart);
      console.log(url);
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

// Delete from cart
export const deleteFromCart: any = createAsyncThunk(
  "cart/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      let cartArrayProducts = localStorage.getItem("cart");
      let cartArray = cartArrayProducts ? JSON.parse(cartArrayProducts) : [];
      cartArray = cartArray.filter(
        (item: { id: string }) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(cartArray));
      return productId;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Clear the cart
export const clearCart: any = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("cart");
      return [];
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get cart products
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete from cart
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cart = state.cart.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Clear the cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
