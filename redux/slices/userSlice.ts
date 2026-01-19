import { UserReduxState } from "@/app/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReduxState = {
  name: "",
  username: "",
  email: "",
  uid: "",
  userTableId: "",
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.userTableId = action.payload.userTableId;
    },
    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = "";
      state.userTableId = "";
    },
  },
});

export const { signInUser, signOutUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
