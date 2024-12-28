import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/products";

export interface Product {
  _id?: object;
  name: string;
  slug?: string;
  description: string;
  brand: string;
  price: number;
  discount?: number;
  countInStock?: number;
  sold?: number;
  images: string[];
  category: object;
  seller: object;
  reviews?: [
    { user: object; rating: number; comment: string; createdAt: Date }
  ];
}

interface ProductState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

// Create new product
export const NewProduct: any = createAsyncThunk(
  "products/new",
  async (product: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/new`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Get all products
export const GetAllProducts: any = createAsyncThunk(
  "products/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/all`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Get single product
export const GetSingleProduct: any = createAsyncThunk(
  "producsts/single",
  async (slug: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${slug}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product
export const UpdateProduct: any = createAsyncThunk(
  "products/update",
  async (product: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/${product._id}/update`, {
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        countInStock: product.countInStock,
        images: product.images,
        category: product.category,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const DeleteProduct: any = createAsyncThunk(
  "products/delete",
  async (product: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${product._id}/delete`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
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
        state.error = null;
        state.products.push(action.payload);
      })
      .addCase(NewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Get all products
      .addCase(GetAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Get single product
      .addCase(GetSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(GetSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Update product
      .addCase(UpdateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          args: { _id },
        } = action.meta;
        if (_id) {
          state.products = state.products.map((product) =>
            product._id === _id ? action.payload : product
          );
        }
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Delete product
      .addCase(DeleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default productSlice.reducer;
