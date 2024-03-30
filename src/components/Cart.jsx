import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../store/slices/cart/cart_slice";

const Cart = ({ func }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, [cartItems]);

  const handleIncrement = (itemId) => {
    dispatch(addToCart({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="fixed grid content-between z-20 right-0 top-0 max-w-xs w-full h-full px-3 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-slate-200">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-slate-700">Your cart</h3>
          <button
            className="text-slate-600 focus:outline-none"
            onClick={() => func(false)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <hr className="my-3" />
        <div className="overflow-y-auto" style={{ height: "75vh" }}>
          {cartItems.map((item) => (
            <div
              className="flex justify-between mt-3 first:mt-0 first:pt-1 first:border-0  border-t pt-3"
              key={item.id}
            >
              <div className="w-full grid grid-cols-3 gap-1 ">
                <img className="h-20 w-20" src={item.image} alt={item.title} />
                <div className="mx-3 col-span-2">
                  <h3 className="text-sm text-slate-600">{item.title}</h3>
                  <div className="flex items-center mt-2">
                    <button
                      className="text-slate-500 focus:outline-none focus:text-slate-600"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M20 12H4"></path>
                      </svg>
                    </button>
                    <span className="text-slate-700 mx-2">{item.quantity}</span>
                    <button
                      className="text-slate-500 focus:outline-none focus:text-slate-600"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                  <span className="text-slate-600 font-bold float-end">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-8 flex font-bold text-xl items-end justify-end">
          Total : ${totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
