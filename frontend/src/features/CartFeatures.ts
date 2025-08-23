import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.REACT_APP_CART_URL;

interface product {
  _id: object;
  quantity: number;
}

interface CartState {
  cart: product[];
  wishlist: product[];
  isLoading: boolean;
  error: object | null;
}
const initialState: CartState = {
  cart: [],
  wishlist: [],
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

// Add to wishlist
export const addToWishlist: any = createAsyncThunk(
  "cart/addToWishlist",
  async (product: product, { rejectWithValue }) => {
    try {
      let foundItems = localStorage.getItem("wishlist");
      let wishlistArray = foundItems ? JSON.parse(foundItems) : [];
      let existingItem = wishlistArray.find(
        (item: { id: object }) => item.id === product._id
      );
      if (!existingItem) {
        wishlistArray.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlistArray));
      }
      return product;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// Get wishlist products
export const getWithlist: any = createAsyncThunk(
  "cart/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const wishlistArray = localStorage.getItem("wishlist");
      const wishlist = wishlistArray ? JSON.parse(wishlistArray) : [];
      const response = await axios.post(`${url}`, wishlist);
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

// Remove from wishlist
export const removeFromWishlist: any = createAsyncThunk(
  "cart/removeFromWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      let wishlistArray = localStorage.getItem("wishlist");
      let wishlist = wishlistArray ? JSON.parse(wishlistArray) : [];
      wishlist = wishlist.filter(
        (item: { id: string }) => item.id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
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
      })
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const existingItem = state.wishlist.find(
          (item) => item._id === action.payload._id
        );
        if (!existingItem) {
          state.wishlist.push(action.payload);
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get wishlist products
      .addCase(getWithlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWithlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wishlist = action.payload;
      })
      .addCase(getWithlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
