import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAPI } from "../../../service/order.api";
import { setAllOrderList } from "../../../redux/slice/order.slice";

export default function OrderChart() {
  const dispatch = useDispatch();
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (allOrderList.length === 0) {
      handleGetAllOrderList();
    }
  }, []);
  // Lay danh sach don hang
  const handleGetAllOrderList = async () => {
    const res = await getAllOrderAPI(user?.access_token);
    if (res.status === "OK") {
      dispatch(setAllOrderList(res.data));
    } else {
      console.log(res.message);
    }
  };
  // Đếm số lượng
  const orderOffline = allOrderList?.filter(
    (order) => order?.paymentMethod === "Offline Payment"
  );
  const orderOnline = allOrderList?.filter(
    (order) => order?.paymentMethod === "Online Payment"
  );
  const cancelOrder = allOrderList?.filter((order) => order?.isCancelled);
  const successOrder = allOrderList?.filter((order) => order?.isSuccessOrder);
  const deliveredOrder = allOrderList?.filter(
    (order) =>
      !order?.isSuccessOrder && !order?.isCancelled && order?.isDelivered
  );
  const deliveringOrder = allOrderList?.filter(
    (order) =>
      !order?.isSuccessOrder &&
      !order?.isCancelled &&
      !order?.isDelivered &&
      order?.isConfirm
  );
  const confirmOrder = allOrderList?.filter(
    (order) =>
      !order?.isSuccessOrder &&
      !order?.isCancelled &&
      !order?.isDelivered &&
      !order?.isConfirm
  );
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full rounded-sm border border-gray-200 h-full">
      <h1 className="text-xl font-bold text-center mb-3 mt-6">
        Thống kê danh sách đơn hàng
      </h1>
      <div className="flex w-full gap-4">
        <div className="flex items-center justify-center w-1/2">
          <div className="w-full max-w-[450px]">
            <h2 className="text-base font-semibold text-left mb-3 mt-6">
              Danh sách đơn hàng theo phương thức thanh toán
            </h2>
            <CChart
              type="doughnut"
              data={{
                labels: ["Thanh toán khi nhận hàng", "Thanh toán online"],
                datasets: [
                  {
                    label: "Số lượng sản phẩm",
                    backgroundColor: ["#f67979", "#41B883"],
                    data: [orderOffline?.length, orderOnline?.length],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center ">
          <div className="w-full max-w-[450px]">
            <h2 className="text-base font-semibold text-left mb-3 mt-6">
              Danh sách đơn hàng theo tình trạng
            </h2>
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Chờ xác nhận",
                  "Đang giao",
                  "Đã giao",
                  "Hoàn thành",
                  "Đã hủy",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#E46651",
                      "#FFBB28",
                      "#00D8FF",
                      "#41B883",
                      "#DD1B16",
                    ],
                    data: [
                      confirmOrder?.length,
                      deliveringOrder?.length,
                      deliveredOrder?.length,
                      successOrder?.length,
                      cancelOrder?.length,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
