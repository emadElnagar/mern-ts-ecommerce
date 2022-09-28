import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/users';

export const UserRegister: any = createAsyncThunk("users/register", async (register: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/register`);
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {    
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {users: [], isLoading: false, error: null},
  reducers: {},
  extraReducers: {
    [UserRegister.pending]: (state: any, action: any) => {
      state.isLoading = true;
      state.error = null;
    },
    [UserRegister.fullfilled]: (state: any, action: any) => {
      state.isLoading = false;
      state.users.push(action.payload);
    },
    [UserRegister.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.error;
    },
  }
});

export default userSlice.reducer;
