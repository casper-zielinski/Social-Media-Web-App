import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: true
};

const loadingSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    loadingFinished: (state) => {
      state.loaded = true;
      state.loading = false;
    },
  },
});

export const { loadingFinished } = loadingSlice.actions;

export default loadingSlice.reducer;