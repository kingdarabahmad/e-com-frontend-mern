import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import guestUserReducer from "./guestUserSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    guestUser: guestUserReducer,
  },
});
