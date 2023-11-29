import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../../utils/function";
import {
  setSelectedOrder,
  setTotalItemsPrice,
} from "../../../redux/slice/order.slice";
import { Link } from "react-router-dom";
export default function OrderTable() {
  const dispatch = useDispatch();
  const totalItemsPrice = useSelector((state) => state.order.totalItemsPrice);
  const orderItems = useSelector((state) => state.order.orderItems);
  const selectedOrder = useSelector((state) => state.order.selectedOrder);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (row) => (
        <div className="flex flex-col min-w-[60px] md:flex-row items-center gap-y-2 w-full">
          <img
            className="w-10 h-10 md:w-20 md:h-20 object-contain object-center"
            src={row.image}
            alt={row.name}
          />
          <p className="w-full md:w-[calc(100%-72px)] text-sm md:text-base  font-medium text-center md:text-left md:font-semibold text-gray-800">
            {row.name}
          </p>
        </div>
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (row) => (
        <p className="text-center text-sm lg:text-base font-normal md:font-medium text-gray-800 w-full">
          {row}
        </p>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (row) => (
        <p className="text-center text-sm lg:text-base font-normal md:font-medium text-gray-800 w-full">
          {convertPrice(row)}
        </p>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (row) => (
        <p className="text-center text-sm lg:text-base font-normal md:font-medium text-gray-800 w-full">
          {convertPrice(row)}
        </p>
      ),
    },
  ];

  const dataTable = orderItems?.map((order) => {
    return {
      key: order?._id,
      product: {
        name: order?.product?.name,
        image: order?.product?.image,
      },
      quantity: order?.quantity,
      price:
        Math.round(
          (order?.product?.price -
            order?.product?.price * (order?.product?.discount || 0) * 0.01) /
            1000
        ) * 1000,
      total:
        order?.quantity *
        Math.round(
          (order?.product?.price -
            order?.product?.price * (order?.product?.discount || 0) * 0.01) /
            1000
        ) *
        1000,
    };
  });

  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  useEffect(() => {
    if (orderItems && orderItems?.length > 0) {
      const initialSelectedKeys = orderItems.map((order) => order?._id);
      setRowSelectedKeys(initialSelectedKeys);
    }
  }, [orderItems]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  useEffect(() => {
    dispatch(setSelectedOrder(rowSelectedKeys));
  }, [rowSelectedKeys]);

  const [amountItems, setAmountItems] = useState(0);
  useEffect(() => {
    if (selectedOrder?.length > 0) {
      const amount = selectedOrder.reduce((totalAmount, item) => {
        return totalAmount + item?.quantity;
      }, 0);
      const total = selectedOrder.reduce((total, item) => {
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
      setAmountItems(amount);
      dispatch(setTotalItemsPrice(total));
    } else {
      dispatch(setTotalItemsPrice(0));
    }
  }, [selectedOrder]);
  return (
    <div className="w-full md:w-[70%] xl:w-[60%]">
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: rowSelectedKeys,
          ...rowSelection,
        }}
        dataSource={dataTable}
        columns={columns}
        pagination={false}
        bordered
      />
      <div className="flex w-full items-center justify-between  mt-10">
        <Link
          to={"/"}
          className="flex font-semibold text-indigo-600 text-sm hover:text-indigo-400 active:scale-95">
          <svg
            className="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512">
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Tiếp tục mua hàng
        </Link>
        <div className="flex items-center ml-auto gap-x-4 max-w-xs mr-8">
          <span className="font-semibold text-sm ">
            Số lượng: {amountItems}
          </span>
          <span className="font-semibold text-sm">
            Tổng tiền: {convertPrice(totalItemsPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
