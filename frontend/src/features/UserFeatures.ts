import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/users';


const userSlice = createSlice({
  name: "user",
  initialState: {users: []},
  reducers: {},
  extraReducers: {}
});

export default userSlice.reducer;
