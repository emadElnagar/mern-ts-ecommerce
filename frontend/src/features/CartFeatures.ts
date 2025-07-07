import { createSlice } from "@reduxjs/toolkit";

export interface cart {
  _id: object;
  quantity: number;
}

interface CartState {
  cart: cart[];
  isLoading: boolean;
  error: object | null;
}
const initialState: CartState = {
  cart: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
