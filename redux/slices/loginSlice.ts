import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const loginSlice = createSlice({
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

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
