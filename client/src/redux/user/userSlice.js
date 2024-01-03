import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = { message: action.payload, exists: true };
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userState.actions;
export const selectUser = (store) => store.user;
export default userState.reducer;
