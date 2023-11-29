import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { SiAdguard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  addToOrderItems,
  resetOrder,
  updateOrderItem,
} from "../../../redux/slice/order.slice";
import { convertPrice } from "../../../utils/function";
import { cancelOrderAPI } from "../../../service/order.api";
const { confirm } = Modal;
export default function OrderDetail() {
  const { id } = useParams();
  const orderList = useSelector((state) => state.order.orderList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderDetail, setDetail] = useState(null);
  const orderItems = useSelector((state) => state.order.orderItems);

  useEffect(() => {
    if (id) {
      const order = orderList?.find((order) => order._id === id) || null;
      setDetail(order);
    }
  }, [id]);

  const handleCancel = async () => {
    const res = await cancelOrderAPI(orderDetail?._id);
    if (res.status === "OK") {
      dispatch(
        updateOrderItem({
          ...orderDetail,
          isConfirm: false,
          isDelivered: false,
          isSuccessOrder: false,
          isCancelled: true,
        })
      );
    }
  };
  const handleCancelModal = () => {
    confirm({
      title: "Bạn có chắc chắn muốn hủy không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        handleCancel();
      },
    });
  };
  const handleBuyAgain = async () => {
    if (orderItems?.length > 0) {
      dispatch(resetOrder());
    }
    orderDetail?.orderItems?.map((item) => dispatch(addToOrderItems(item)));
    setTimeout(() => {
      navigate("/createOrder");
    }, 1000);
  };
  return (
    <div className="min-h-[740px]">
      <main className="rounded-sm block">
        <section>
          <div className="px-6 py-5 text-sm/4 flex justify-between items-center">
            <span
              onClick={() => navigate(-1)}
              className="flex mr-4 cursor-pointer items-center text-[rgba(0,0,0,0.54)] border-none bg-none p-0">
              <RiArrowLeftSLine className="text-xl" />
              <span>TRỞ LẠI</span>
            </span>
            <div className="flex text-right">
              <span className="text-[rgb(238,77,45)] uppercase font-semibold ">
                {orderDetail?.isCancelled
                  ? "Đã hủy"
                  : orderDetail?.isSuccessOrder
                  ? "Hoàn thành"
                  : orderDetail?.isDelivered
                  ? "Đã giao"
                  : orderDetail?.isConfirm
                  ? "Đang giao"
                  : "Chờ xác nhận"}
              </span>
            </div>
          </div>
        </section>
        <section>
          <div className="py-3 px-6 flex flex-nowrap items-center justify-between">
            <div className="pr-3 text-left break-words text-gray-500 text-sm/4">
              {!orderDetail?.isCancelled
                ? orderDetail?.isSuccessOrder
                  ? " Đơn hàng đã thành công, bạn có thể mua lại sản phẩm hoặc tiếp tục mua sắm tại trang chủ nhé!"
                  : " Trong thời gian này, bạn có thể liên hệ với Người bán để xác nhận thêm thông tin đơn hàng nhé!"
                : " Đơn hàng đã được hủy, bạn có thể mua lại sản phẩm hoặc tiếp tục mua sắm tại trang chủ nhé!"}
            </div>
            <div>
              {orderDetail?.isCancelled || orderDetail?.isSuccessOrder ? (
                <button
                  onClick={() => handleBuyAgain()}
                  className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md bg-orange-500 text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-orange-600">
                  Mua lại
                </button>
              ) : (
                <button className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-blue-300">
                  Liên hệ Người bán
                </button>
              )}
            </div>
          </div>
        </section>
        <section>
          <div className="py-3 px-6 flex flex-nowrap items-center justify-end">
            {!orderDetail?.isSuccessOrder ? (
              <div onClick={() => handleCancelModal()}>
                <button
                  className={`${
                    orderDetail?.isCancelled ? "hidden" : ""
                  } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-red-300`}>
                  Hủy đơn hàng
                </button>
              </div>
            ) : (
              <div onClick={() => navigate("/")}>
                <button
                  className={`font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-blue-300`}>
                  Trang trủ
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="p-5 text-lg">
            <div className="pb-3 flex justify-between items-end">
              <div className="capitalize text-gray-800 text-xl/6">
                Địa chỉ nhận hàng
              </div>
            </div>
            <div className="flex">
              <div className="max-w-full flex-1 pt-2 pr-4">
                <div className="max-w-full mb-2 overflow-hidden capitalize text-ellipsis text-gray-700 ">
                  Người nhận: {orderDetail?.shippingAddress?.fullName}
                </div>
                <div className="text-base whitespace-pre-line text-gray-500 ">
                  <span>
                    Số điện thoại: {orderDetail?.shippingAddress?.phone}
                  </span>
                  <br />
                  <span>Địa chỉ: {orderDetail?.shippingAddress?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div>
              <div className="py-3 px-6">
                <div className="pb-3 flex items-center justify-start">
                  <div className="flex items-center">
                    <div className="text-sm/4 uppercase font-semibold text-gray-700">
                      MĐH: {orderDetail?._id}
                    </div>
                  </div>
                </div>
                <div className="border-b" />
                {orderDetail?.orderItems.map((item) => (
                  <Link
                    key={item?._id}
                    className="flex items-center text-base break-words pt-3 flex-nowrap text-[rgba(0,0,0,0.87)]"
                    to={`/product/${item?.product?._id}`}>
                    <div className="flex flex-1 flex-nowrap items-start pr-3 break-words ">
                      <img
                        className="w-20 h-20 flex-shrink-0 border object-contain rounded overflow-hidden bg-[rgb(225,225,225)]"
                        src={item?.product?.image}
                        alt={item?.product?.name}
                      />
                      <div className="min-w-0 pl-3 flex flex-1 flex-col items-start break-words">
                        <div className="overflow-hidden text-ellipsis mb-[5px] text-lg/5 max-h-12 line-clamp-2">
                          <span className="align-middle ">
                            {item?.product?.name}
                          </span>
                        </div>
                        <div>
                          <div className="mb-[5px] text-[rgba(0,0,0,0.54)] ">
                            Phân loại: {item?.product?.category}
                          </div>
                          <div className="mb-[5px]">x{item?.quantity}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="ml-3">
                        {Boolean(item?.product?.discount) && (
                          <span className="mr-1 line-through text-black opacity-25 overflow-hidden text-ellipsis">
                            {convertPrice(
                              item?.product?.price * item?.quantity
                            )}
                          </span>
                        )}

                        <span className="text-[#ee4d2d] ">
                          {convertPrice(
                            Math.round(
                              (item?.product?.price -
                                item?.product?.price *
                                  item?.product?.discount *
                                  0.01) /
                                1000
                            ) *
                              1000 *
                              item?.quantity
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base">
                    <span>Tổng tiền hàng</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] break-words text-black/80 w-[240px] text-base ">
                    <div>{convertPrice(orderDetail?.itemsPrice)}</div>
                  </div>
                </div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base">
                    <span>Phí vận chuyển</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] text-base break-words text-black/80 w-[240px] ">
                    <div>{convertPrice(orderDetail?.shippingPrice)}</div>
                  </div>
                </div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base ">
                    <span>Thành tiền</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] break-words text-black/80 w-[240px] ">
                    <div className="text-[rgb(238,77,45)] text-xl font-semibold">
                      {convertPrice(orderDetail?.totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="px-6 flex justify-end text-right border-none border-black/[0.09] bg-[rgb(255,254,250)] text-base">
            <div className="px-[10px] py-[13px]  min-w-[200px] flex items-center gap-x-2">
              <span className="cursor-pointer">
                <SiAdguard className="text-[#ee4d24]" />
              </span>
              <span className="align-middle">Phương thức Thanh toán</span>
            </div>
            <div className="py-[13px] pl-[10px] w-[240px] break-words text-black/80 border-l border-dotted border-black/[0.09]">
              <div>
                {orderDetail?.paymentMethod === "Offline Payment"
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán online"}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
