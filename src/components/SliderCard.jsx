import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiCurrencyRupee } from "react-icons/hi";
import { IoBasket } from "react-icons/io5";
import { convertPrice } from "../utils/function";
import { addToCartList, setCartList } from "../redux/slice/cart.slice";
import { addToCarAPI, getCartListAPI } from "../service/cart.api";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../redux/slice/alert.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataDetail, setShowDetail } from "../redux/slice/product.slice";

export default function SliderCard({ data, isNew = false }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleGetDetail = () => {
    dispatch(setShowDetail(true));
    dispatch(setDataDetail(data));
  };
  const productList = useSelector((state) => state.product.productList);
  const [cartItem, setCartItem] = useState(data);
  const [cartItemSlice, setCartItemSlice] = useState({
    product: {},
    quantity: 1,
    userID: "",
    _id: "",
  });
  useEffect(() => {
    setCartItem({
      quantity: 1,
      productID: data?._id,
      userID: user?.id,
    });
    setCartItemSlice({
      product: productList?.find((p) => p?._id === data?._id),
      quantity: 1,
      userID: user?.id,
    });
  }, [data]);

  //Mã lỗi: Out of Memory
  const addToCart = async () => {
    if (!user?.id) {
      dispatch(setWarningAlert("Vui lòng đăng nhập !!!"));
      setTimeout(() => {
        navigate("/login", { state: location?.pathname });
      }, 2000);
    } else {
      const res = await addToCarAPI(cartItem);
      if (res.status === "OK") {
        dispatch(setSuccessAlert(res.message));
        dispatch(addToCartList({ ...cartItemSlice, _id: res?.data?._id }));
        // getCartList();
      } else {
        dispatch(setErrAlert(res.message));
      }
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  const getCartList = async () => {
    const cartL = await getCartListAPI(user?.id);
    if (cartL.status === "OK") {
      dispatch(setCartList(cartL.data));
    }
  };
  return (
    <div className="group bg-lightOverlay hover:drop-shadow-lg shadow-md  backdrop-blur-md flex items-center justify-between relative px-4 py-2 w-full rounded-xl cursor-grab gap-3 h-[144px] overflow-hidden">
      <img
        src={data?.image}
        className="w-[90px] h-32 object-contain group-hover:scale-110"
        alt={data?.name}
      />
      <div className="flex flex-col gap-2 min-w-[150px] pr-2">
        <Tooltip
          title="Thêm vào giỏ hàng"
          color="#108ee9"
          placement="bottomLeft">
          <div
            onClick={addToCart}
            className="w-8 h-8 ml-auto mr- rounded-full bg-red-500 flex items-center justify-center cursor-pointer active:scale-95 hover:scale-110">
            <IoBasket className="text-2xl text-primary" />
          </div>
        </Tooltip>
        <p
          className="text-lg text-headingColor font-semibold text-center text-ellipsis cursor-pointer"
          onClick={handleGetDetail}>
          {data?.name}
        </p>
        <div className="flex items-center justify-end w-full">
          <p className="text-lg font-semibold text-red-500 flex items-center  gap-1">
            <HiCurrencyRupee className="text-red-500" />
            {convertPrice(
              Boolean(data?.discount)
                ? Math.round(
                    (data?.price - data?.price * data?.discount * 0.01) / 1000
                  ) * 1000
                : data?.price
            )}
          </p>
          {Boolean(data?.discount) && (
            <div className="text-gray-500 line-through ml-4 scale-90 font-bold text-center">
              {data?.price}đ
            </div>
          )}
        </div>
      </div>
      {Boolean(data?.discount) && (
        <div className="absolute text-sm bg-red-500 rounded-full top-1 -right-[18px] text-white w-16 h-6 flex items-center justify-center rotate-45">
          -{data?.discount}%
        </div>
      )}
      {Boolean(isNew) && (
        <div className="absolute bg-blue-400 capitalize rounded-full top-1 left-1 text-white w-10 h-10 flex items-center justify-center -rotate-[15deg]">
          Mới
        </div>
      )}
    </div>
  );
}
