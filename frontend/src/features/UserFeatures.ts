import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

const url = 'http://localhost:5000/api/users';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdming: boolean;
  image?: string;
  phone?: string;
}

interface UserState {
  users: User[],
  user: User | null,
  profile: User | null,
  isLoading: boolean,
  error: object | null
}

const initialState: UserState = {
  users: [],
  user: null,
  profile: null,
  isLoading: false,
  error: null
}

// User Sign Up Service
export const SignUp: any = createAsyncThunk("users/register", async (register: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/register`, register);
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {    
    return rejectWithValue(error.message);
  }
});

// User Login Service
export const Login: any = createAsyncThunk("users/login", async (login: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/login`, login);
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// User Logout Service
export const Logout: any = createAsyncThunk("users/logout", async () => {
  sessionStorage.removeItem('userInfo');
});

// Get All Users
export const GetAllUsers: any = createAsyncThunk("users/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/all`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get User Profile
export const GetProfile: any = createAsyncThunk("users/profile",async (user: any, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/profile/${user._id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User Register Reducer
    UserRegister: (state, action: PayloadAction<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      isAdmin: boolean;
    }>) => {
      state.users.push({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        isAdming: false
      })
    }
  },
  extraReducers: (builder) => {
    builder
      // User register extra reducers
      .addCase(SignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users.push(action.payload);
        state.user = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // User login extra reducers
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // User logout extra reducers
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
      })
      // Get all users extra reducers
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      // User profile extra reducers
      .addCase(GetProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export const { UserRegister } = userSlice.actions;
export default userSlice.reducer;
