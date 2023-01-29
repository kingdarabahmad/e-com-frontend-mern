import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("userData")) || {
  isLogged: false,
  name: "",
  photo: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignInData: (state, action) => {
      state = action.payload;
      localStorage.setItem("userData", JSON.stringify(state));
      return state;
    },
    setSignOutData: (state, action) => {
      state = action.payload;
      localStorage.setItem("userData", JSON.stringify(state));
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSignInData, setSignOutData, signInAsGuest } =
  authSlice.actions;

export default authSlice.reducer;
