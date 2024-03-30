import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/api/products";
import cartReducer from "./slices/cart/cart_slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
