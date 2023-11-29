import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../../utils/function";
import { addToOrderItems, resetOrder } from "../../../redux/slice/order.slice";
import { useNavigate } from "react-router-dom";
import { setCartShow } from "../../../redux/slice/cart.slice";

export default function CartBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const orderItems = useSelector((state) => state.order.orderItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const handleSetOrderItems = () => {
    if (orderItems?.length > 0) {
      dispatch(resetOrder());
    }
    cartList?.map((item) => dispatch(addToOrderItems(item)));
    dispatch(setCartShow(false));
    setTimeout(() => {
      navigate("/createOrder");
    }, 1000);
  };
  return (
    <div className="relative w-full h-[calc(100%-72px)] bg-cartBg rounded-t-[2rem] flex flex-col px-4 pt-4 items-start">
      <div className="w-full max-h-[80%] flex flex-col gap-3 overflow-y-scroll scrollbar-none">
        {cartList?.map((item, index) => (
          <CartItem data={item} key={index} />
        ))}
      </div>
      {/* cart total */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] max-h-[20%] w-full flex-1 bg-cartTotal flex flex-col items-center justify-evenly px-6 py-2 rounded-t-[2rem] border-t-2 border-gray-600">
        <div className="w-full flex items-center justify-between text-gray-400 text-lg font-semibold">
          <p>Tổng:</p>
          <p>{convertPrice(totalPrice)}</p>
        </div>
        <button
          onClick={handleSetOrderItems}
          className=" w-full p-2 rounded-full text-lg my-2 text-gray-50 bg-gradient-to-tr from-orange-400 to-orange-500 hover:shadow-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-150 ease-out active:scale-90">
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
