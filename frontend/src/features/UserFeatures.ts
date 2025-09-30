import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JwtPayload, jwtDecode } from "jwt-decode";
import axios from "axios";
import { USERS_API_URL } from "../API";

const url = USERS_API_URL;

export interface User {
  _id?: object;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  image?: string;
  phone?: string;
}

interface UserState {
  users: User[];
  searchedUsers: User[];
  user: User | null;
  profile: User | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: UserState = {
  users: [],
  searchedUsers: [],
  user: null,
  profile: null,
  isLoading: false,
  error: null,
};

// User Sign Up Service
export const SignUp: any = createAsyncThunk(
  "users/register",
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/register`, user);
      const data = jwtDecode<JwtPayload>(response.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      sessionStorage.setItem("token", response.data.token);
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// User Login Service
export const Login: any = createAsyncThunk(
  "users/login",
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, user);
      const data = jwtDecode<JwtPayload>(response.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      sessionStorage.setItem("token", response.data.token);
      return data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// User Logout Service
export const Logout: any = createAsyncThunk("users/logout", async () => {
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("token");
  return null;
});

// Get All Users
export const GetAllUsers: any = createAsyncThunk(
  "users/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/all`);
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

// Get User Profile
export const GetProfile: any = createAsyncThunk(
  "users/profile",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/profile/${id}`);
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

// Update User Name
export const updateUserName: any = createAsyncThunk(
  "users/namechange",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${url}/name/update`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
        },
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

// Change Email
export const changeEmail: any = createAsyncThunk(
  "users/emailchange",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/email/change`,
        {
          email: user.email,
        },
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

// Change User Image
export const changeUserImage: any = createAsyncThunk(
  "users/image",
  async (data: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/profile/image`,
        data.formData,
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

// Change User Password
export const ChangePassword: any = createAsyncThunk(
  "users/password/change",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/password/change`,
        {
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
        },
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

// Change User Role
export const UpdateRole: any = createAsyncThunk(
  "users/role",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${url}/${user.id}/update/role`,
        {
          role: user.role,
        },
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

// Delete User (By Admin)
export const DeleteUser: any = createAsyncThunk(
  "users/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${url}/${id}/delete`, config);
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

// Delete Profile (By User)
export const DeleteProfile: any = createAsyncThunk(
  "profile/delte",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${url}/profile/delete`,
        {
          password: user.password,
        },
        config
      );
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
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
// Search user
export const SearchUser: any = createAsyncThunk(
  "users/search",
  async (search: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}?search=${search}`);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.profile = null;
      state.users = [];
      state.searchedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // User register extra reducers
      .addCase(SignUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users.push(action.payload);
        state.user = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // User login extra reducers
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // User logout extra reducers
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      // Get all users extra reducers
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // User profile extra reducers
      .addCase(GetProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Change user name
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user
          );
        }
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Change user email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
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
        state.error = action.payload;
      })
      // Change user password
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user
          );
        }
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Change user image
      .addCase(changeUserImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user
          );
        }
      })
      .addCase(changeUserImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update user role
      .addCase(UpdateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(UpdateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user
          );
        }
      })
      // Delete user extra reducers (By Admin)
      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.filter(
            (user) => user._id !== action.payload
          );
        }
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete user (By User)
      .addCase(DeleteProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.filter(
            (user) => user._id !== action.payload
          );
        }
      })
      .addCase(DeleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Search user
      .addCase(SearchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.searchedUsers = action.payload;
      })
      .addCase(SearchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
