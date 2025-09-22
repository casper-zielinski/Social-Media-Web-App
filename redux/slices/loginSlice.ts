import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: {
    pending: true,
    loggedIn: false,
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
    },
  },
});

export const { logIn, logOut, received } = loginSlice.actions;

export default loginSlice.reducer;
