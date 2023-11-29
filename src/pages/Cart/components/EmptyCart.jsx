import React from "react";
import { emptyCart } from "../../../assets";
import { useDispatch } from "react-redux";
import { setCartShow } from "../../../redux/slice/cart.slice";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCartShow(false));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className="w-full h-[80%] flex items-center justify-center flex-col gap-y-8">
      <h3 className="w-full text-xl font-semibold text-blue-500 text-center">
        Giỏ hàng của bạn trống
      </h3>
      <img src={emptyCart} alt="" />

      <button
        onClick={handleClick}
        className=" w-4/5 p-2 rounded-full text-lg my-2 text-gray-50 bg-gradient-to-tr from-orange-400 to-orange-500 hover:shadow-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-150 ease-out active:scale-90">
        Tiếp tục mua hàng
      </button>
    </div>
  );
}
