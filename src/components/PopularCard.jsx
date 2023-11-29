import React, { useEffect, useState } from "react";
import { IoBasket } from "react-icons/io5";
import { HiCurrencyRupee } from "react-icons/hi";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../redux/slice/alert.slice";
import { addToCarAPI } from "../service/cart.api";
import { addToCartList } from "../redux/slice/cart.slice";
import { convertPrice } from "../utils/function";

export default function PopularCard({ data, isNew = false }) {
  const user = useSelector((state) => state.user.user);
  const popularList = useSelector((state) => state.product.popularList);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
      product: popularList?.find((p) => p?._id === data?._id),
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
      } else {
        dispatch(setErrAlert(res.message));
      }
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  return (
    <div className="group md:w-[calc(25%-42px)] w-[calc(50%-38px)] cursor-grab shadow border-l border-r rounded mx-[15px] mb-[32px] shadow-card relative overflow-hidden  shadow-[#ccc] bg-gray-100">
      <div className=" rounded-lg flex flex-col">
        <div className="h-40 w-full rounded relative pt-4">
          <img
            className=" w-full h-full object-contain object-center transition-all duration-[0.2s] group-hover:scale-125 group-hover:-rotate-12"
            src={data?.image}
            alt={data?.name}
          />
          <Tooltip
            title="Thêm vào giỏ hàng"
            color="#108ee9"
            placement="bottomLeft">
            <div
              onClick={addToCart}
              className="absolute top-4 right-7 w-8 h-8 ml-auto cursor-pointer rounded-full bg-red-500 flex items-center justify-center  active:scale-95 ">
              <IoBasket className="text-2xl text-primary" />
            </div>
          </Tooltip>
        </div>
        <div className="p-4 flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
              {data?.category}
            </h3>
            <div className="text-red-500 text-sm md:text-base font-bold text-center flex items-center ">
              <HiCurrencyRupee className="text-red-500" />
              {convertPrice(
                Boolean(data?.discount)
                  ? Math.round(
                      (data?.price - data?.price * data?.discount * 0.01) / 1000
                    ) * 1000
                  : data?.price
              )}
            </div>
          </div>
          <p className="text-lg min-h-[56px] text-center cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis text-headingColor font-semibold title-font">
            {data?.name}
          </p>
        </div>
      </div>

      {Boolean(data?.discount) && (
        <div className="absolute text-sm bg-red-500 rounded-full top-1 -right-[18px] text-white w-16 h-6 flex items-center justify-center rotate-45">
          -{data?.discount}%
        </div>
      )}
      {Boolean(isNew) && (
        <div className="absolute capitalize text-sm top-1 left-1 bg-[#d3b673] font-bold rotate-[-15deg] rounded-full text-white w-8 h-8 flex justify-center items-center">
          new
        </div>
      )}
    </div>
  );
}
