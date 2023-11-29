import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCartShow } from "../redux/slice/cart.slice";

export default function CartIcon() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isShowCart = useSelector((state) => state.cart.isShowCart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div
      onClick={() => dispatch(setCartShow(!isShowCart))}
      className="ml-auto relative cursor-pointer text-gray-700 hover:scale-105  active:scale-95 ">
      <AiOutlineShoppingCart className="text-3xl" />
      <div className=" absolute rounded-full w-5 h-5 flex items-center top-3 bg-red-400 -right-2 justify-center">
        <p className="text-primary text-sm font-semibold ">
          {user?.id ? totalAmount : 0}
        </p>
      </div>
    </div>
  );
}
