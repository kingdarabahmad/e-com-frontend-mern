import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("guestUserData")) || {
  guestUserLogged: false,
};
export const guestSlice = createSlice({
  name: "guestUser",
  initialState,
  reducers: {
    guestUser: (state, action) => {
      state = action.payload;
      localStorage.setItem("guestUserData", JSON.stringify(state));
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { guestUser } = guestSlice.actions;

export default guestSlice.reducer;
