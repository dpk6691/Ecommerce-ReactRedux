// cart_slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.cartItems.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
        } else {
          existingItem.quantity--;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
