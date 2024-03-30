import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cart/cart_action";

const Detail = ({ productId, onBack }) => {
  const products = useSelector((state) => state.product.data);
  const product = products.find((item) => item.id === productId);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const productInCart = cartItems.find((item) => item.id === productId);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="text-slate-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="w-1/2 flex rounded border border-slate-200 py-10 text-center">
              <img
                alt="ecommerce"
                className="w-1/2 m-auto"
                src={product.image}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <button
                onClick={onBack}
                className="mb-10 ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Back
              </button>

              <h2 className="text-sm title-font text-slate-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-slate-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {product.rating.rate} / 5{" "}
                  <span className="text-slate-600 ml-3">
                    {product.rating.count} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>

              <div className="flex pt-10">
                <span className="title-font font-medium text-2xl text-slate-900">
                  $ {product.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="
                  flex
                  ml-auto
                  text-white
                  bg-green-500
                  border-0
                  py-2
                  px-6
                  focus:outline-none
                  hover:bg-green-600
                  rounded"
                >
                  Add to Cart{" "}
                  {productInCart && (
                    <span className="bg-black text-white px-2 ml-2 rounded-full">
                      {productInCart.quantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
