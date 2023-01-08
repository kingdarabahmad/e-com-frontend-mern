import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("data")) || [] ,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state?.cart?.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
        localStorage.setItem("data", JSON.stringify(state.cart));
        return state;
      } else {
        state?.cart?.push(action.payload);
        localStorage.setItem("data", JSON.stringify(state.cart));
        return state;
      }
    },
    removeItem: (state, action) => {
      state.cart = state?.cart?.filter((item) => item.id !== action.payload);
      localStorage.setItem("data", JSON.stringify(state.cart));
      return state;
    },
    resetCart: (state) => {
      state.cart = [];
      localStorage.setItem("data", JSON.stringify(state?.cart));
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
