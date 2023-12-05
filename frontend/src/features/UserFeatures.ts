import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/users';

export interface User {
  _id?: object;
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
export const GetProfile: any = createAsyncThunk("users/profile", async (id: any, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/profile/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Change Email
export const changeEmail: any = createAsyncThunk("users/emailchange", async (user: any, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${url}/${user._id}/email/change`, {
      email: user.email
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
})

// Change User Password
export const ChangePassword: any = createAsyncThunk("users/password/change", async (user: any, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${url}/${user._id}/password/change`, {
      currentPassword: user.currentPassword,
      newPassword: user.newPassword
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Delete User (By Admin)
export const DeleteUser: any = createAsyncThunk("users/delete", async (id: any, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Delete Profile (By User)
export const DeleteProfile: any = createAsyncThunk("profile/delte", async (user: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/profile/${user._id}/delete`, {
      currentPassword: user.currentPassword
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User register extra reducers
      .addCase(SignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.isLoading = false;
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
        state.error = action.payload;
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
      // Change user email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
          user._id === _id ? action.payload : user
        );
        }
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user password
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.pending, (state, action) => {
        state.isLoading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
          user._id === _id ? action.payload : user
          );
        }
      })
      .addCase(ChangePassword.pending, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Delete user extra reducers (By Admin)
      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.filter((user) => user._id !== action.payload)
        }
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Delete user (By User)
      .addCase(DeleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.filter((user) => user._id !== action.payload)
        }
      })
      .addCase(DeleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export default userSlice.reducer;
