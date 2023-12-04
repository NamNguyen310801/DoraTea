import React, { useEffect, useState } from "react";
import {
  convertISOToNewFormat,
  convertPrice,
} from "../../../../utils/function";

import { Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderId,
  setRecentOrderList,
} from "../../../../redux/slice/order.slice";
import { getRecentOrderAPI } from "../../../../service/order.api";
import { setErrAlert, setNullAlert } from "../../../../redux/slice/alert.slice";
import { setShowOrder } from "../../../../redux/slice/loading.slice";

export default function RecentOrders() {
  const recentOrderList = useSelector((state) => state.order.recentOrderList);
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recentOrderList?.length === 0) {
      handleGetRecentOrder();
    }
  }, []);

  const handleGetRecentOrder = async () => {
    setIsLoading(true);
    const res = await getRecentOrderAPI(user?.access_token);
    if (res.status === "OK") {
      dispatch(setRecentOrderList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
    setIsLoading(false);
  };
  const handleClick = (id) => {
    dispatch(setShowOrder(true));
    dispatch(setOrderId(id));
  };
  const columns = [
    {
      title: "Đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (row, index) => (
        <div className="cursor-pointer w-full" onClick={() => handleClick(row)}>
          <p
            className="max-w-[200px] text-ellipsis w-full line-clamp-1"
            key={index}>
            {row.slice(0, 4) + "..." + row.slice(-4)}{" "}
          </p>
        </div>
      ),
    },

    {
      title: "Tên Người Mua",
      dataIndex: "name",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">{row}</p>
      ),
    },

    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">
          {(row && convertISOToNewFormat(row)) || "Chưa xác định"}
        </p>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">{convertPrice(row)}</p>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">
          {row === "Offline Payment"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán online"}
        </p>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paid",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">
          {row?.isPaid
            ? `Đã thanh toán: ${convertISOToNewFormat(row?.paidAt)}`
            : "Chờ thanh toán"}
        </p>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => (
        <p className="text-ellipsis w-full line-clamp-1">
          {row?.isCancelled
            ? "Đã hủy"
            : row?.isSuccessOrder
            ? "Hoàn thành"
            : row?.isDelivered
            ? "Đã giao"
            : row?.isConfirm
            ? "Đang giao"
            : "Chờ xác nhận"}
        </p>
      ),
    },
  ];
  const dataTable =
    recentOrderList?.length > 0 &&
    recentOrderList?.map((order) => {
      return {
        _id: order._id,
        key: order._id,
        orderItems: order.orderItems,
        itemsPrice: order.itemsPrice,
        deliveredAt: order.deliveredAt,
        shippingPrice: order.shippingPrice,
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
        user: order.user,
        name: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        paid: {
          isPaid: order.isPaid,
          paidAt: order.paidAt,
        },
        status: {
          isDelivered: order.isDelivered,
          isSuccessOrder: order.isSuccessOrder,
          isConfirm: order.isConfirm,
          isCancelled: order.isCancelled,
        },
        createdAt: order?.createdAt || null,
      };
    });
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Đơn hàng gần đây</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 w-full">
        <Spin spinning={isLoading} className="z-30">
          <Table
            dataSource={dataTable}
            columns={columns}
            pagination={false}
            style={{ width: "100%" }}
          />
        </Spin>
      </div>
    </div>
  );
}
