import React, { useEffect, useState } from "react";
import { SiAdguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { convertPrice } from "../utils/function";
import { useDispatch, useSelector } from "react-redux";
import {
  addToOrderItems,
  resetOrder,
  updateOrderItem,
} from "../redux/slice/order.slice";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { cancelOrderAPI, successOrderAPI } from "../service/order.api";
const { confirm } = Modal;
export default function OrderItem({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.product.productList);
  const orderItems = useSelector((state) => state.order.orderItems);

  const [editOrder, setEditOrder] = useState(null);
  const [itemsOrder, setItemsOrder] = useState(null);

  useEffect(() => {
    setEditOrder(data);
  }, [data]);
  useEffect(() => {
    setItemsOrder(
      data?.orderItems?.map((item) => {
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
  }, [data?.orderItems]);
  const handleSuccess = async () => {
    const res = await successOrderAPI(editOrder?._id);
    if (res.status === "OK") {
      dispatch(
        updateOrderItem({
          ...editOrder,
          isConfirm: true,
          isDelivered: true,
          isSuccessOrder: true,
          isCancelled: false,
        })
      );
    }
  };
  const handleCancel = async () => {
    const res = await cancelOrderAPI(editOrder?._id);
    if (res.status === "OK") {
      dispatch(
        updateOrderItem({
          ...editOrder,
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
    data?.orderItems?.map((item) => dispatch(addToOrderItems(item)));
    setTimeout(() => {
      navigate("/createOrder");
    }, 1000);
  };
  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div className="flex flex-col w-full py-3 px-4">
        <div className="flex items-center justify-between py-3 w-full bg-slate-200 rounded">
          <Link
            to={`/user/orders-detail/${data?._id}`}
            className="text-base text-gray-500 font-semibold flex items-center">
            MĐH: {data?._id}
          </Link>
          <div className="text-lg text-red-500 font-normal uppercase flex items-center">
            {data?.isCancelled
              ? "Đã hủy"
              : data?.isSuccessOrder
              ? "Hoàn thành"
              : data?.isDelivered
              ? "Đã giao"
              : data?.isConfirm
              ? "Đang giao"
              : "Chờ xác nhận"}
          </div>
        </div>
        {itemsOrder?.map((item) => (
          <Link
            key={item?._id}
            to={`/product/${item?._id}`}
            className="border-t flex cursor-pointer w-full">
            <div className="flex w-full break-words flex-wrap items-center pt-3 text-gray-800 justify-between">
              <div className="flex justify-center gap-x-2">
                <img
                  src={item?.image}
                  className="w-20 h-20 bg-contain bg-center rounded "
                  alt=""
                />
                <div
                  className="flex flex-1 items-start flex-col break-words pl-3 min-w-0 gap-y-2
            ">
                  <div className="overflow-hidden text-ellipsis line-clamp-2 text-base flex items-center">
                    <span className="text-gray-700">{item?.name}</span>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="text-gray-400 text-sm">
                      Phân loại hàng: {item?.category}
                    </div>
                    <div className="text-base text-gray-600">
                      x {item?.quantity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  text-right px-4 ">
                <div className="flex items-center gap-x-4 ">
                  {Boolean(item?.discount) && (
                    <span className="text-gray-400 line-through">
                      {convertPrice(item?.price * item?.quantity)}
                    </span>
                  )}
                  <span className="text-red-600 font-semibold">
                    {convertPrice(
                      Math.round(
                        (item?.price - item?.price * item?.discount * 0.01) /
                          1000
                      ) *
                        1000 *
                        item?.quantity
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center py-3 px-4 justify-end border-t gap-x-4">
        <div className="flex items-center">
          <SiAdguard className="text-[#ee4d24]" />
        </div>
        <label className="text-sm text-gray-600">Số tiền phải trả:</label>
        <div className="text-lg font-bold text-red-600">
          {convertPrice(data?.totalPrice)}
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 items-end justify-center border-t border-b">
        <section className="flex gap-x-4">
          {data?.isDelivered && !data?.isSuccessOrder && (
            <button
              onClick={() => handleSuccess()}
              className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md bg-red-500 text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-red-600 text-white">
              Đã nhận hàng
            </button>
          )}
          {(data?.isCancelled || data?.isSuccessOrder) && (
            <button
              onClick={() => handleBuyAgain()}
              className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md bg-orange-500 text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-orange-600">
              Mua lại
            </button>
          )}
          <button className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-green-300">
            Liên hệ Người bán
          </button>
          {(!data?.isSuccessOrder ||
            !data?.isConfirm ||
            !data?.isDelivered) && (
            <button
              onClick={() => handleCancelModal()}
              className={`${
                data?.isCancelled ? "hidden" : ""
              } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-red-300`}>
              Hủy đơn hàng
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
