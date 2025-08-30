import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = modalSlice.actions;

export default modalSlice.reducer;
