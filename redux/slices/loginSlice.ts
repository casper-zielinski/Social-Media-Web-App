import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: {
    pending: true,
    loggedIn: false,
    asGuest: false,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    received: (state) => {
      state.loggedIn.pending = false;
    },
    logIn: (state) => {
      state.loggedIn.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn.loggedIn = false;
      state.loggedIn.asGuest = false;
    },
    loggedInasGuest: (state) => {
      state.loggedIn.asGuest = true;
    },
  },
});

export const { logIn, logOut, received, loggedInasGuest } = loginSlice.actions;

export default loginSlice.reducer;
