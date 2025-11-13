import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API_URL } from "../API";

const url = PRODUCTS_API_URL;

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
  data: {
    products: Product[];
    page: number | null;
    pages: number | null;
    totalProducts: number | null;
  };
  searchedProducts: Product[];
  similarProducts: Product[];
  product: Product | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: ProductState = {
  data: {
    products: [],
    page: null,
    pages: null,
    totalProducts: null,
  },
  searchedProducts: [],
  similarProducts: [],
  product: null,
  isLoading: false,
  error: null,
};

// Create new product
export const NewProduct: any = createAsyncThunk(
  "products/new",
  async (product: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${url}/new`, product, config);
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

// Get all products
export const GetAllProducts: any = createAsyncThunk<
  any,
  { page?: number; limit?: number }
>("products/all", async (data = {}, { rejectWithValue }) => {
  try {
    const page = data.page;
    const limitQuery = data.limit;
    const response = await axios.get(
      `${url}/all?page=${page ?? 1}${limitQuery ? `&limit=${limitQuery}` : ""}`
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get single product
export const GetSingleProduct: any = createAsyncThunk(
  "producsts/single",
  async (slug: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${slug}`);
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

// Get similar products
export const GetSimilarProducts: any = createAsyncThunk(
  "products/similar",
  async (slug: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${slug}/similar`);
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

// Search products
export const SearchProducts: any = createAsyncThunk(
  "products/search",
  async (keyword: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}?search=${keyword}`);
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

// Update product
export const UpdateProduct: any = createAsyncThunk(
  "products/update",
  async (product: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${url}/${product.slug}/update`,
        product.data,
        config
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

// Delete product
export const DeleteProduct: any = createAsyncThunk(
  "products/delete",
  async (product: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${url}/${product._id}/delete`,
        config
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

// create product review
export const ReviewProduct: any = createAsyncThunk(
  "products/review",
  async (review: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${url}/${review.slug}/review`,
        review,
        config
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.data = {
        products: [],
        page: null,
        pages: null,
        totalProducts: null,
      };
      state.searchedProducts = [];
      state.similarProducts = [];
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create new product
      .addCase(NewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(NewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data.products.push(action.payload);
      })
      .addCase(NewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get all products
      .addCase(GetAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get single product
      .addCase(GetSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(GetSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get similar products
      .addCase(GetSimilarProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSimilarProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similarProducts = action.payload;
      })
      .addCase(GetSimilarProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update product
      .addCase(UpdateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { slug } = action.meta.arg;
        if (slug) {
          state.data.products = state.data.products.map((product) =>
            product.slug === slug ? action.payload : product
          );
        }
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete product
      .addCase(DeleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.data.products = state.data.products.filter(
            (product) => product._id !== action.payload
          );
        }
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Search products
      .addCase(SearchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.searchedProducts = action.payload;
      })
      .addCase(SearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create product review
      .addCase(ReviewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ReviewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.product?.reviews?.push(action.payload.review);
      })
      .addCase(ReviewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
