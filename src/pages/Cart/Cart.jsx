import React, { useEffect } from "react";
import { CartBody, CartHeader, EmptyCart } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { setTotalAmount, setTotalPrice } from "../../redux/slice/cart.slice";

export default function Cart() {
  const dispatch = useDispatch();
  const isShowCart = useSelector((state) => state.cart.isShowCart);
  const cartList = useSelector((state) => state.cart.cartList);
  useEffect(() => {
    if (cartList?.length > 0) {
      const amount = cartList.reduce((totalAmount, item) => {
        return totalAmount + item?.quantity;
      }, 0);
      const total = cartList.reduce((total, item) => {
        return (
          total +
          Math.round(
            (item?.product?.price -
              item?.product?.price * (item?.product?.discount || 0) * 0.01) /
              1000
          ) *
            1000 *
            item?.quantity
        );
      }, 0);
      dispatch(setTotalPrice(total));
      dispatch(setTotalAmount(amount));
    } else {
      dispatch(setTotalPrice(0));
      dispatch(setTotalAmount(0));
    }
  }, [cartList]);

  return (
    <div
      className={`${
        isShowCart ? "right-0" : "-right-full"
      } fixed top-[90px]  w-full md:w-375 2xl:w-460 transition-all duration-300 h-[calc(100vh-90px)] z-[51] bg-white border flex flex-col drop-shadow-md px-4 rounded-t-[30px]`}>
      {/* cart header */}
      <CartHeader />
      {/* body cart */}
      {!Boolean(cartList?.length > 0) ? <EmptyCart /> : <CartBody />}
    </div>
  );
}
