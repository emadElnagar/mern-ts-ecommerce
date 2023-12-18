import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/products';

export interface Product {
  _id?: object;
  name: string;
  slug?: string;
  description: string;
  brand: string;
  price: number;
  discount: number;
  countInStock?: number;
  sold?: number;
  images: string[];
  category: object;
  seller: object;
  reviews?: [
    user: object,
    rating: number,
    comment: string,
    createdAt: Date
  ];
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

// Create new product
export const NewProduct: any = createAsyncThunk("products/new",async (product: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/new`, {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      discount: product.discount,
      countInStock: product.countInStock,
      images: product.images,
      category: product.category,
      seller: product.seller
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create new product
      .addCase(NewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(NewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(NewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export default productSlice.reducer;
