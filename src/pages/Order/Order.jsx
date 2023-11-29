import React from "react";
import { useSelector } from "react-redux";
import { Empty } from "../../assets";
import { BackHome } from "../../components";
import { OrderInfor, OrderTable } from "./components";

export default function Order() {
  const orderItems = useSelector((state) => state.order.orderItems);
  return (
    <div className="p-4 w-full flex flex-col">
      <div className="w-full flex justify-between px-4 items-center">
        <h2 className=" text-lg md:text-xl 2xl:text-[28px] font-semibold text-blue-500">
          Đơn hàng
        </h2>
        <BackHome />
      </div>
      <div className="flex flex-col md:flex-row mt-4 items-start w-full">
        {orderItems?.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <img src={Empty} alt="" className="w-96" />
            <p className="text-gray-800 text-lg ">Đơn hàng trống</p>
          </div>
        ) : (
          <>
            <OrderTable />
            <OrderInfor />
          </>
        )}
      </div>
    </div>
  );
}
