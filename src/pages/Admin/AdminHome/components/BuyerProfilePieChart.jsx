import React, { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { setAllOrderList } from "../../../../redux/slice/order.slice";
import { getAllOrderAPI } from "../../../../service/order.api";
import { useDispatch, useSelector } from "react-redux";

export default function BuyerProfilePieChart() {
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
  const data = [
    { name: "Chờ xác nhận", value: confirmOrder?.length },
    { name: "Đang giao", value: deliveringOrder?.length },
    { name: "Đã giao", value: deliveredOrder?.length },
    { name: "Hoàn thành", value: successOrder?.length },
    { name: "Đã hủy", value: cancelOrder?.length },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ["#000080", "#8A2BE2", "#1E90FF", "#41B883", "#DD1B16"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="w-[20%] h-full min-h-[350px] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Tình trạng đơn hàng</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value">
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
