// cart_action.js
import { addToCart as addToCartAction } from "./cart_slice";

export const addToCart = (product) => (dispatch) => {
  dispatch(addToCartAction(product));
};

export const incrementCount = () => ({
  type: "INCREMENT_COUNT",
});
