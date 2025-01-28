import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { JwtPayload, jwtDecode } from "jwt-decode";
import axios from "axios";

const url = "http://localhost:5000/api/users";

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
  user: User | null;
  profile: User | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: UserState = {
  users: [],
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
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// User Logout Service
export const Logout: any = createAsyncThunk("users/logout", async () => {
  sessionStorage.removeItem("userInfo");
});

// Get All Users
export const GetAllUsers: any = createAsyncThunk(
  "users/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/all`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

// Update User Name
export const updateUserName: any = createAsyncThunk(
  "users/namechange",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/${user._id}/name/update`, {
        firstName: user.firstName,
        lastName: user.lastName,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Change Email
export const changeEmail: any = createAsyncThunk(
  "users/emailchange",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${user._id}/email/change`, {
        email: user.email,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Change User Image
export const changeUserImage: any = createAsyncThunk(
  "users/image",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${url}/profile/${data._id}/image`,
        data.formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Change User Password
export const ChangePassword: any = createAsyncThunk(
  "users/password/change",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${user._id}/password/change`, {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Change User Role
export const UpdateRole: any = createAsyncThunk(
  "users/role",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${user.id}/update/role`, {
        role: user.role,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete User (By Admin)
export const DeleteUser: any = createAsyncThunk(
  "users/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}/delete`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Profile (By User)
export const DeleteProfile: any = createAsyncThunk(
  "profile/delte",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/profile/${user._id}/delete`, {
        password: user.password,
      });
      sessionStorage.removeItem("userInfo");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Search user
export const SearchUser: any = createAsyncThunk(
  "users/search",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}?search=${user.search}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
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
        state.error = null;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // User logout extra reducers
      .addCase(Logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      // Get all users extra reducers
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user name
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.error;
      })
      // Change user email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.error;
      })
      // Change user password
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.error;
      })
      // Change user image
      .addCase(changeUserImage.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.error;
      })
      // Update user role
      .addCase(UpdateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
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
        state.error = action.error;
      })
      // Delete user (By User)
      .addCase(DeleteProfile.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.error;
      })
      // Search user
      .addCase(SearchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(SearchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
