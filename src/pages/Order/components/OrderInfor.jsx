import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setCoupon,
  setFullName,
  setPaymentMethod,
  setPhone,
  setIsPaid,
  setShippingPrice,
  setTotalOrderPrice,
  resetOrder,
  setIsDelivered,
  setOrderList,
  setAllOrderList,
  setOrderCheckout,
} from "../../../redux/slice/order.slice";
import { validatePhoneNumber } from "../../../utils/stringsUtils";
import { convertPrice } from "../../../utils/function";
import * as OrderService from "../../../service/order.api";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../../redux/slice/alert.slice";
import { useNavigate } from "react-router-dom";
import { deleteManyCartItemAPI } from "../../../service/cart.api";
import { setCartList } from "../../../redux/slice/cart.slice";

export default function OrderInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const orderList = useSelector((state) => state.order.orderList);
  const allOrderList = useSelector((state) => state.order.allOrderList);

  const fullName = useSelector((state) => state.order.fullName);
  const phone = useSelector((state) => state.order.phone);
  const address = useSelector((state) => state.order.address);
  const paymentMethod = useSelector((state) => state.order.paymentMethod);
  const shippingPrice = useSelector((state) => state.order.shippingPrice);
  const totalOrderPrice = useSelector((state) => state.order.totalOrderPrice);
  const totalItemsPrice = useSelector((state) => state.order.totalItemsPrice);
  const coupon = useSelector((state) => state.order.coupon);
  const isPaid = useSelector((state) => state.order.isPaid);
  const paidAt = useSelector((state) => state.order.paidAt);
  const isDelivered = useSelector((state) => state.order.isDelivered);
  const deliveredAt = useSelector((state) => state.order.deliveredAt);
  const isCancelled = useSelector((state) => state.order.isCancelled);

  console.log(orderList);
  console.log(allOrderList);
  useEffect(() => {
    dispatch(setTotalOrderPrice(totalItemsPrice + shippingPrice));
  }, [shippingPrice, totalItemsPrice]);
  useEffect(() => {
    if (user?.id) {
      dispatch(setPhone(user?.phone));
      dispatch(setFullName(user?.name));
      dispatch(setAddress(user?.address));
    }
  }, [user]);
  const cartList = useSelector((state) => state.cart.cartList);
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const ids = selectedOrder?.map((item) => item?._id);

  const dataOrder = {
    orderItems: selectedOrder?.map((item) => ({
      quantity: item?.quantity,
      product: item?.product?._id,
    })),
    fullName: fullName,
    address: address,
    phone: phone,
    paymentMethod: paymentMethod,
    itemsPrice: totalItemsPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalOrderPrice,
    user: user?.id,
    isPaid: isPaid,
    paidAt: paidAt,
    isDelivered: isDelivered,
    deliveredAt: deliveredAt,
    isCancelled: isCancelled,
  };
  const createOrder = async () => {
    if (
      Boolean(fullName) &&
      Boolean(address) &&
      validatePhoneNumber(phone) &&
      Boolean(paymentMethod) &&
      Boolean(shippingPrice)
    ) {
      if (paymentMethod === "Online Payment") {
        handleCheckOnline();
      } else {
        handleCheckOffline();
        const res = await OrderService.createOrderAPI(dataOrder);
        if (res.status === "OK") {
          dispatch(setSuccessAlert(res.message));
          setTimeout(() => {
            dispatch(resetOrder());
            dispatch(setNullAlert());
          }, 2000);
          await deleteManyCartItemAPI(ids);
          dispatch(
            setCartList(cartList?.filter((item) => !ids.includes(item?._id)))
          );
          const orders = await OrderService.getAllOrderDetailsAPI(user?.id);
          if (orders.status === "OK") {
            console.log(orders.data);
            dispatch(setOrderList(orders.data));
          }
        } else {
          dispatch(setErrAlert(res.message));
          setTimeout(() => {
            dispatch(setNullAlert());
          }, 2000);
        }
      }
    } else {
      dispatch(setWarningAlert("Vui lòng điền đầy đủ thông tin!"));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  const handleCheckOnline = () => {
    dispatch(setOrderCheckout(dataOrder));
    setTimeout(() => {
      navigate("/checkout");
    }, 400);
  };
  const handleCheckOffline = () => {
    dispatch(setIsPaid(false));
    dispatch(setIsDelivered(false));
  };
  return (
    <div className="w-full md:w-[30%] xl:w-[40%] md:px-4 flex flex-col">
      <h3 className="font-semibold text-gray-600 text-base">
        Thông tin của bạn
      </h3>
      <form className="flex flex-col gap-y-4 mt-4 mb-5">
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-600 text-sm w-full">
            Họ và tên
          </label>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={fullName}
            onChange={(e) => dispatch(setFullName(e.target.value))}
            className="px-2 py-[5px] w-full  outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {!Boolean(fullName) && (
            <p className="font-semibold text-red-500 text-sm">
              Vui lòng nhập thông tin!
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-600 text-sm  w-full">
            Số điện thoại
          </label>
          <input
            type="number"
            value={phone}
            placeholder="Nhập số điện thoại của bạn"
            onChange={(e) => dispatch(setPhone(e.target.value))}
            className="px-2 py-[5px] w-full outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {!validatePhoneNumber(phone) && (
            <p className="font-semibold text-red-500 text-sm">
              Vui lòng nhập số điện thoại!
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-600 text-sm w-full">
            Địa chỉ
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => dispatch(setAddress(e.target.value))}
            placeholder="Nhập địa chỉ của bạn"
            className=" px-2 py-[5px] w-full outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {!Boolean(address) && (
            <p className="font-semibold text-red-500 text-sm">
              Vui lòng nhập thông tin!
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-600 text-sm w-full">
            Phương thức thanh toán
          </label>
          <select
            className="block p-2 border rounded outline-none text-gray-600 w-full text-sm"
            defaultValue={0}
            onChange={(e) => dispatch(setPaymentMethod(e.target.value))}>
            <option value={0} disabled>
              Chọn phương thức thanh toán
            </option>
            <option value={"Offline Payment"}>Thanh toán khi nhận hàng</option>
            <option value={"Online Payment"}>Thanh toán online</option>
          </select>
          {!Boolean(paymentMethod) && (
            <p className="font-semibold text-red-500 text-sm">
              Vui lòng nhập thông tin!
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 text-sm w-full ">
            Shipping
          </label>
          <select
            defaultValue={0}
            className="block p-2 border rounded outline-none text-gray-600 w-full text-sm"
            onChange={(e) =>
              dispatch(setShippingPrice(Number(e.target.value)))
            }>
            <option value={0} disabled>
              Phương thức vận chuyển
            </option>
            <option value={"15000"}>
              Vận chuyển thông thường - 15.000 VNĐ
            </option>
            <option value={"20000"}>Vận chuyển nhanh - 20.000 VNĐ</option>
          </select>
          {!Boolean(shippingPrice) && (
            <p className="font-semibold text-red-500 text-sm">
              Vui lòng nhập thông tin!
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 text-sm w-full">
            Ưu đãi
          </label>
          <input
            type="text"
            onChange={(e) => dispatch(setCoupon(e.target.value))}
            placeholder="Nhập mã giảm giá"
            className="px-2 py-[5px] w-full outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
      <div id="summary" className="w-full pb-4">
        <div className="border-t">
          <div className="flex flex-col items-center font-normal py-6 text-sm">
            <div className="w-full flex justify-between items-center">
              <span>Tiền hàng:</span>
              <span> {convertPrice(totalItemsPrice)}</span>
            </div>

            <div className="w-full flex justify-between items-center">
              <span>Phí vận chuyển:</span>
              <span> {convertPrice(shippingPrice)}</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span>Ưu đãi:</span>
              <span> -{convertPrice(coupon)}</span>
            </div>
            <div className="font-semibold w-full flex justify-between items-center">
              <span>Tổng cộng:</span>
              <span> {convertPrice(totalOrderPrice)}</span>
            </div>
          </div>
          <button
            onClick={() => createOrder()}
            className="bg-indigo-500 font-semibold rounded hover:bg-indigo-600 active:scale-95 py-3 text-sm text-white uppercase w-full ">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
