import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/products';

export interface Product {
  _id?: object;
  name: string;
  description: string;
  brand: string;
  price: number;
  discount: number;
}

interface ProductState {
  products: Product[],
  product: Product | null,
  isLoading: boolean,
  error: object | null
}

const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  error: null
}

const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
