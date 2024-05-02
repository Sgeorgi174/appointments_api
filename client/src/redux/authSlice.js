import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  token: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
          email: action.payload.email,
        })
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
