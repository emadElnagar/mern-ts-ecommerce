import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      });
  },
});

export default cartSlice.reducer;
