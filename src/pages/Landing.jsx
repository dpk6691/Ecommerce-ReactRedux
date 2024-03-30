// Landing.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Detail from "./Detail";
import { getAllProducts } from "./../store/slices/api/action";
import { addToCart } from "../store/slices/cart/cart_action";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productID, setProductID] = useState(null);
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.product
  );
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(data) {
    return data.filter((item) =>
      search_parameters.some((param) =>
        item[param].toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  function handleClick(id) {
    setProductID(id);
  }

  function handleGoBack() {
    setProductID(0);
  }

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  return (
    <>
      {productID > 0 ? (
        <Detail productId={productID} onBack={handleGoBack} />
      ) : (
        <div className="my-8">
          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="container mx-auto px-6">
            <div className="mt-16">
              {isLoading && <p>Loading...</p>}
              {isSuccess && data.length > 0 && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  {search(data).map((product) => (
                    <div
                      key={product.id}
                      className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
                    >
                      <div className="flex items-end justify-end h-56 w-full">
                        <a
                          className="cursor-pointer"
                          onClick={() => handleClick(product.id)}
                        >
                          <img
                            className="object-contain "
                            src={product.image}
                          />
                        </a>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-2 relative rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
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
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {cartItems.find((item) => item.id === product.id)
                            ?.quantity > 0 && (
                            <span className="bg-black absolute -top-3 -right-3 px-2 rounded-full">
                              {
                                cartItems.find((item) => item.id === product.id)
                                  ?.quantity
                              }
                            </span>
                          )}
                        </button>
                      </div>
                      <div className="px-5 py-3">
                        <h3 className="text-slate-700 uppercase">
                          <a
                            className="cursor-pointer"
                            onClick={() => handleClick(product.id)}
                          >
                            {product.title}
                          </a>
                        </h3>
                        <span className="text-slate-500 mt-2">
                          $ {product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
