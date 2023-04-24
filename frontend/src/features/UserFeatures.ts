import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

const url = 'http://localhost:5000/api/users';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[],
  isLoading: boolean,
  error: object | null
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null
}

// User Sign Up
export const SignUp: any = createAsyncThunk("users/register", async (register: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/register`, register);
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {    
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UserRegister: (state, action: PayloadAction<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>) => {
      state.users.push({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password
      })
    }
  },
  extraReducers: {
    [SignUp.pending]: (state: any, _action: any) => {
      state.isLoading = true;
      state.error = null;
    },
    [SignUp.fullfilled]: (state: any, action: any) => {
      state.isLoading = false;
      state.users.push(action.payload);
    },
    [SignUp.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.error;
    },
  }
});

export const { UserRegister } = userSlice.actions;
export default userSlice.reducer;
