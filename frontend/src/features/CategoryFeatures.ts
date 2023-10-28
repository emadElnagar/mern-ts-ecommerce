import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/categories';

export interface Category {
  _id?: object;
  title: string;
  author: object;
}

interface CategoryState {
  categories: Category[],
  category: Category | null,
  isLoading: boolean,
  error: object | null
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null
}
