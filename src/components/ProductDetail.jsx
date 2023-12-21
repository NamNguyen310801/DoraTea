import { InputNumber, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../redux/slice/alert.slice";
import { addToCarAPI, getCartItemAPI } from "../service/cart.api";
import { addToCartList } from "../redux/slice/cart.slice";
import { convertPrice } from "../utils/function";
import { addToOrderItems, resetOrder } from "../redux/slice/order.slice";

export default function ProductDetail({ data, onClose }) {
  const showDetail = useSelector((state) => state.product.showDetail);
  const user = useSelector((state) => state.user.user);
  const orderItems = useSelector((state) => state.order.orderItems);
  const discountList = useSelector((state) => state.product.discountList);

  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState({
    quantity: 1,
    productID: "",
    userID: "",
  });
  const [cartItemSlice, setCartItemSlice] = useState({
    product: {},
    quantity: 1,
    userID: "",
    _id: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setCartItem({
      quantity: 1,
      productID: data?._id,
      userID: user?.id,
    });
    setCartItemSlice({
      product: discountList?.find((p) => p?._id === data?._id),
      quantity: 1,
      userID: user?.id,
    });
  }, [data]);
  const handleOnClose = (e) => {
    if (e.target.id === "productDetail") onClose();
  };
  const handleSetOrderItems = async () => {
    if (!user?.id) {
      dispatch(setWarningAlert("Vui lòng đăng nhập !!!"));
      setTimeout(() => {
        navigate("/login", { state: location?.pathname });
      }, 2000);
    } else {
      if (orderItems?.length > 0) {
        dispatch(resetOrder());
      }
      const res = await addToCarAPI(cartItem);
      const item = await getCartItemAPI(res.data?._id);
      if (item.status === "OK") {
        dispatch(addToOrderItems(item.data));
        setTimeout(() => {
          navigate("/createOrder");
        }, 1000);
      }
    }
  };
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
        dispatch(
          addToCartList({
            ...cartItemSlice,
            _id: res?.data?._id,
            quantity: cartItem?.quantity,
            // description:cartItem?.description,
            // sizeFee:cartItem?.sizeFee,
          })
        );
      } else {
        dispatch(setErrAlert(res.message));
      }
      setTimeout(() => {
        onClose();
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  return (
    <div
      id="productDetail"
      onClick={handleOnClose}
      className={`${
        showDetail ? "" : "hidden "
      }fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full  bg-gray-400 bg-opacity-20 backdrop-blur-sm`}>
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
        <div className="relative flex w-full items-center overflow-hidden rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
            <AiOutlineClose className="text-xl" />
          </button>
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
              <img
                src={data?.image}
                alt={data?.name}
                className="object-contain object-center"
              />
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                {data?.name}
              </h2>
              <section aria-labelledby="information-heading" className="mt-2">
                <p className="text-2xl text-gray-900">
                  {convertPrice(
                    Boolean(data?.discount)
                      ? Math.round(
                          (data?.price - data?.price * data?.discount * 0.01) /
                            1000
                        ) * 1000
                      : data?.price
                  )}
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">
                    Đánh giá
                  </h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Rate value={data?.rating} disabled />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-700">
                      {data?.rating}/5
                    </p>
                    {/* <a
                      href="#"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      117 reviews
                    </a> */}
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">Mô tả</h4>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-500">
                      {data?.description}
                    </p>
                  </div>
                </div>
              </section>
              <section className="flex justify-between mt-4">
                <div className="">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      Chọn kích cỡ
                    </h4>
                  </div>
                  <div className=" gap-x-4 mt-1 inline-flex">
                    <button className="flex items-center justify-center border border-blue-300 w-8 h-8 rounded-full text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm focus:bg-blue-500 focus:text-white">
                      S
                    </button>
                    <button className="flex items-center justify-center border border-blue-300 w-8 h-8 rounded-full text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm focus:bg-blue-500 focus:text-white">
                      M
                    </button>
                    <button className="flex items-center justify-center border border-blue-300 w-8 h-8 rounded-full text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm focus:bg-blue-500 focus:text-white">
                      L
                    </button>
                  </div>
                </div>
                <div className="flex gap-x-3 h-8">
                  <h4 className="text-sm font-medium text-gray-900">
                    Số lượng:
                  </h4>
                  <InputNumber
                    min={1}
                    onChange={(value) =>
                      setCartItem((prev) => ({ ...prev, quantity: value }))
                    }
                    value={cartItem?.quantity || 1}
                  />
                </div>
              </section>
              <section className="flex justify-between mt-4">
                <div className="flex flex-col gap-y-4">
                  <div className=" gap-x-4 mt-1 flex flex-col">
                    <h5 className="text-sm font-medium text-gray-900">Đường</h5>
                    <div className="flex gap-x-4 text-sm">
                      <div className="flex items-center gap-x-2">
                        <input
                          type="radio"
                          id="sugar"
                          name="sugar"
                          value="Không Đường"
                        />
                        <label htmlFor="sugar"> Không</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          type="radio"
                          id="sugar"
                          name="sugar"
                          value="50% Đường"
                        />
                        <label htmlFor="sugar"> 50%</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          type="radio"
                          id="sugar"
                          name="sugar"
                          value="75% Đường"
                        />
                        <label htmlFor="sugar"> 75%</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          type="radio"
                          id="sugar"
                          name="sugar"
                          value="100% Đường"
                        />
                        <label htmlFor="sugar"> 100%</label>
                      </div>
                    </div>
                  </div>
                  <div className=" gap-x-4 mt-1 flex flex-col">
                    <h5 className="text-sm font-medium text-gray-900">Đá</h5>
                    <div className="flex gap-x-4 text-sm">
                      <div className="flex items-center gap-x-2">
                        <input
                          type="radio"
                          id="da"
                          name="da"
                          value="Không Đá"
                        />
                        <label htmlFor="da"> Không</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input type="radio" id="da" name="da" value="50% Đá" />
                        <label htmlFor="da"> 50%</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input type="radio" id="da" name="da" value="75% Đá" />
                        <label htmlFor="da"> 75%</label>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input type="radio" id="da" name="da" value="100% Đá" />
                        <label htmlFor="da"> 100%</label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="flex w-full items-center justify-between gap-8">
                <button
                  onClick={() => handleSetOrderItems()}
                  className="mt-6 flex w-full items-center justify-center bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 xl:px-6 xl:py-3 hover:from-orange-500 hover:to-orange-700 rounded-xl text-white text-sm md:text-base font-semibold active:scale-95">
                  Mua ngay
                </button>
                <button
                  className="mt-6 flex w-full items-center justify-center bg-gradient-to-bl from-blue-400 to-blue-600 px-4 py-2 xl:px-6 xl:py-3 hover:from-blue-500 hover:to-blue-700 rounded-xl text-white text-sm md:text-base font-semibold active:scale-95"
                  onClick={addToCart}>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
