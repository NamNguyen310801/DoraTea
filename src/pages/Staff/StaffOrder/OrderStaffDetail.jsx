import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { convertISOToNewFormat, convertPrice } from "../../../utils/function";
import { SiAdguard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { FcPrint } from "react-icons/fc";
import QRCode from "react-qr-code";
import {
  cancelOrderAPI,
  confirmOrderAPI,
  sendConfirmOrderAPI,
  sendSuccessOrderAPI,
  successOrderAPI,
} from "../../../service/order.api";
import { updateAllOrderList } from "../../../redux/slice/order.slice";
import { Modal, Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { useReactToPrint } from "react-to-print";
const { confirm } = Modal;
export default function OrderStaffDetail({ onClose }) {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);

  const orderId = useSelector((state) => state.order.orderId);
  const productList = useSelector((state) => state.product.productList);
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const userList = useSelector((state) => state.user.userList);
  const showOrder = useSelector((state) => state.loading.showOrder);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const componentRef = useRef();
  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);
  useEffect(() => {
    setOrderItems(
      order?.orderItems?.map((item) => {
        let productOrders = productList?.find(
          (product) => product?._id === item?.product
        );
        return {
          _id: productOrders?._id,
          name: productOrders?.name,
          category: productOrders?.category,
          image: productOrders?.image,
          price: productOrders?.price,
          discount: productOrders?.discount,
          quantity: item?.quantity,
        };
      })
    );
  }, [order?.orderItems]);
  const getOrder = async (id) => {
    const orderItem = await allOrderList?.find((item) => item._id === id);
    const user = userList?.find((user) => user?._id === orderItem?.user);
    setOrder(orderItem);
    setEmail(user?.email);
  };
  const handleOnClose = (e) => {
    if (e.target.id === "orderDetail") onClose();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn hàng",
  });
  const handleCancel = async () => {
    const res = await cancelOrderAPI(orderId);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      dispatch(
        updateAllOrderList({
          ...order,
          isConfirm: false,
          isDelivered: false,
          isSuccessOrder: false,
          isCancelled: true,
        })
      );
    }
  };
  const handleSuccess = async () => {
    const res = await successOrderAPI(orderId);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      await sendSuccessOrderAPI({ email });
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
      dispatch(
        updateAllOrderList({
          ...order,
          isConfirm: true,
          isDelivered: true,
          isSuccessOrder: true,
          isCancelled: false,
          deliveredAt: order?.deliveredAt || new Date().toISOString(),
          isPaid: true,
          paidAt: order?.isPaid || new Date().toISOString(),
        })
      );
    }
  };
  const handleConfirm = async () => {
    const data = {
      email: email,
      orderId: orderId,
    };
    const res = await confirmOrderAPI(orderId);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      await sendConfirmOrderAPI(data);
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
      dispatch(
        updateAllOrderList({
          ...order,
          isConfirm: true,
          isDelivered: false,
          isSuccessOrder: false,
          isCancelled: false,
        })
      );
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
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
  return (
    <div
      id="orderDetail"
      onClick={handleOnClose}
      className={`${
        showOrder ? "" : "hidden "
      }fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full bg-gray-400 bg-opacity-20 backdrop-blur-sm min-h-[750px]`}>
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl overflow-hidden">
        <div className="relative flex w-full flex-col  overflow-hidden rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 max-h-[700px] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-4 lg:top-4">
            <AiOutlineClose className="text-xl" />
          </button>
          <Tooltip title={"In đơn hàng"} placement="right">
            <button
              className="absolute top-12 left-12 text-[30px] cursor-pointer"
              onClick={handlePrint}
              disabled={order?.isCancelled}>
              <FcPrint />
            </button>
          </Tooltip>
          <div className="px-6 py-5 text-base/4 flex justify-end items-center w-full">
            <span className="text-[rgb(238,77,45)] uppercase font-semibold ">
              {order?.isCancelled
                ? "Đã hủy"
                : order?.isSuccessOrder
                ? "Hoàn thành"
                : order?.isPaid
                ? order?.isDelivered
                  ? "Đã giao"
                  : "Đang giao"
                : "Chờ thanh toán"}
            </span>
          </div>
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
                    Người nhận: {order?.shippingAddress?.fullName}
                  </div>
                  <div className="text-base whitespace-pre-line text-gray-500 ">
                    <span>Số điện thoại: {order?.shippingAddress?.phone}</span>
                    <br />
                    <span>Địa chỉ: {order?.shippingAddress?.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div className="">
                <div className="py-3 px-6 max-h-[240px] overflow-y-auto">
                  <div className="pb-3 flex items-center justify-start">
                    <div className="flex items-center">
                      <div className="text-sm/4 uppercase font-semibold text-gray-700">
                        MĐH: {order?._id}
                      </div>
                    </div>
                  </div>
                  <div className="border-b" />
                  {orderItems?.map((item) => (
                    <Link
                      key={item?._id}
                      className="flex items-center text-base break-words pt-3 flex-nowrap text-[rgba(0,0,0,0.87)]"
                      to={`/product/${item?._id}`}>
                      <div className="flex flex-1 flex-nowrap items-start pr-3 break-words ">
                        <img
                          className="w-20 h-20 flex-shrink-0 border object-contain rounded overflow-hidden bg-[rgb(225,225,225)]"
                          src={item?.image}
                          alt={item?.name}
                        />
                        <div className="min-w-0 pl-3 flex flex-1 flex-col items-start break-words">
                          <div className="overflow-hidden text-ellipsis mb-[5px] text-lg/5 max-h-12 line-clamp-2">
                            <span className="align-middle ">{item?.name}</span>
                          </div>
                          <div>
                            <div className="mb-[5px] text-[rgba(0,0,0,0.54)] ">
                              Phân loại: {item?.category}
                            </div>
                            <div className="mb-[5px]">x{item?.quantity}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="ml-3">
                          {Boolean(item?.discount) && (
                            <span className="mr-1 line-through text-black opacity-25 overflow-hidden text-ellipsis">
                              {convertPrice(item?.price * item?.quantity)}
                            </span>
                          )}

                          <span className="text-[#ee4d2d] ">
                            {convertPrice(
                              Math.round(
                                (item?.price -
                                  item?.price * (item?.discount || 0) * 0.01) /
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
                      <div>{convertPrice(order?.itemsPrice)}</div>
                    </div>
                  </div>
                  <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                    <div className="px-[10px] py-[13px] text-black/50 text-base">
                      <span>Phí vận chuyển</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] text-base break-words text-black/80 w-[240px] ">
                      <div>{convertPrice(order?.shippingPrice)}</div>
                    </div>
                  </div>
                  <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                    <div className="px-[10px] py-[13px] text-black/50 text-base ">
                      <span>Thành tiền</span>
                    </div>
                    <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] break-words text-black/80 w-[240px] ">
                      <div className="text-[rgb(238,77,45)] text-xl font-semibold">
                        {convertPrice(order?.totalPrice)}
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
                  {order?.paymentMethod === "Offline Payment"
                    ? "Thanh toán khi nhận hàng"
                    : "Thanh toán online"}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="py-3 px-6 flex flex-nowrap items-center justify-between gap-x-4">
              <div>
                <button
                  onClick={() => handleCancelModal()}
                  disabled={
                    order?.isConfirm ||
                    order?.isDelivered ||
                    order?.isPaid ||
                    order?.isSuccessOrder
                  }
                  className={`${
                    order?.isCancelled || order?.isSuccessOrder ? "hidden" : ""
                  } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 text-white capitalize rounded-md bg-red-400 text-ellipsis overflow-hidden outline-none w-[120px] border hover:bg-red-500`}>
                  Hủy
                </button>
              </div>
              <div onClick={() => handleSuccess()}>
                <button
                  className={`${
                    order?.isCancelled || order?.isSuccessOrder ? "hidden" : ""
                  } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-white text-ellipsis overflow-hidden outline-none w-[120px] border 
                  bg-blue-400 hover:bg-blue-500`}>
                  Hoàn thành
                </button>
              </div>
              <div onClick={() => handleConfirm()}>
                <button
                  disabled={order?.isConfirm}
                  className={`${
                    order?.isCancelled || order?.isSuccessOrder ? "hidden" : ""
                  } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-white bg-green-400 text-ellipsis overflow-hidden outline-none w-[120px] border hover:bg-green-500`}>
                  Xác nhận
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Print order */}
      <div
        className="hidden"
        style={{
          width: "360px",
          background: "#fff",
        }}
        ref={componentRef}>
        <section
          style={{
            width: "100%",
            padding: "20px",
            paddingBottom: "0px",
            position: "relative",
          }}>
          <QRCode
            size={30}
            style={{
              height: "auto",
              maxWidth: "30px",
              width: "30px",
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
            value={order?._id || ""}
            viewBox={`0 0 30 30`}
          />
          <div
            style={{
              textTransform: "capitalize",
              fontSize: 20,
              textAlign: "center",
              fontWeight: 600,
            }}>
            DoraTea
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
            }}>
            {convertISOToNewFormat(new Date().toISOString())}
          </div>
          <div
            style={{
              textTransform: "uppercase",
              fontSize: 16,
              fontWeight: 600,
            }}>
            MĐH: {order?._id}
          </div>
          <div
            style={{
              textTransform: "capitalize",
              fontSize: 16,
            }}>
            Địa chỉ nhận hàng
          </div>
          <div>
            <div>Người nhận: {order?.shippingAddress?.fullName}</div>
            <div>Số điện thoại: {order?.shippingAddress?.phone}</div>
            <div>Địa chỉ: {order?.shippingAddress?.address}</div>
          </div>
        </section>
        <section
          style={{
            width: "100%",
            padding: "20px",
            paddingTop: "0px",
          }}>
          <div style={{ borderTop: "1px solid #000", marginTop: "4px" }}>
            <div
              style={{
                fontSize: 16,
              }}>
              Danh sách:
            </div>
            {order?.orderItems.map((item) => (
              <div
                key={item?._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  overflowWrap: "break-word",
                }}>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <div>{item?.product?.name}</div>
                  <div>x {item?.quantity}</div>
                </div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <div>Loại: {item?.product?.category}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}>
                    {Boolean(item?.product?.discount) && (
                      <span
                        style={{
                          textDecorationLine: "line-through",
                          marginRight: "8px",
                        }}>
                        {convertPrice(item?.product?.price * item?.quantity)}
                      </span>
                    )}
                    <span>
                      {convertPrice(
                        Math.round(
                          (item?.product?.price -
                            item?.product?.price *
                              (item?.product?.discount || 0) *
                              0.01) /
                            1000
                        ) *
                          1000 *
                          item?.quantity
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              borderTop: "1px solid #000",
              marginTop: "4px",
            }}>
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <span>Tổng tiền hàng</span>
              <div>{convertPrice(order?.itemsPrice)}</div>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <span>Phí vận chuyển</span>
              <div>{convertPrice(order?.shippingPrice)}</div>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <span>Thành tiền</span>
              {convertPrice(order?.totalPrice)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
