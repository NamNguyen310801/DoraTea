import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderAPI } from "../../../service/order.api";
import { setAllOrderList } from "../../../redux/slice/order.slice";
import { DatePicker, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import {
  calculateMonthYearlyOrder,
  calculateYearlyOrders,
  getCurrentYear,
  revenueByDay,
} from "../../../utils/function";
import { useState } from "react";
export default function OrderChart() {
  const dispatch = useDispatch();
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const user = useSelector((state) => state.user.user);
  const [year, setYear] = useState(getCurrentYear());
  const [month, setMonth] = useState("");
  const [dataOrdersDayByMonth, setDataOrdersDayByMonth] = useState([]);
  const [dataOrderMonthYear, setDataOrderMonthYear] = useState([]);
  const [dataOrdersYear, setDataOrdersYear] = useState([]);
  const [monthYearOrderData, setMonthYearOrderData] = useState("");
  const [yearOrdersData, setYearOrdersData] = useState("");
  const yearList = [...new Set(dataOrderMonthYear?.map((item) => item?.year))];

  useEffect(() => {
    if (allOrderList.length === 0) {
      handleGetAllOrderList();
    } else {
      setDataOrderMonthYear(calculateMonthYearlyOrder(allOrderList));
      setDataOrdersYear(calculateYearlyOrders(allOrderList));
    }
  }, [allOrderList]);
  useEffect(() => {
    if (allOrderList.length === 0) {
      handleGetAllOrderList();
    } else {
      setDataOrdersDayByMonth(revenueByDay(allOrderList, month));
    }
  }, [allOrderList, month]);
  useEffect(() => {
    setMonthYearOrderData(
      dataOrderMonthYear?.filter((item) => item?.year === year)
    );
  }, [year, dataOrderMonthYear]);
  useEffect(() => {
    setYearOrdersData(dataOrdersYear?.find((item) => item?.year === year));
  }, [year, dataOrdersYear]);

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
  const dataYearlyChart = [
    {
      year: yearOrdersData?.year || "",
      unSuccess: yearOrdersData?.unSuccess || 0,
      success: yearOrdersData?.success || 0,
      total: yearOrdersData?.total || 0,
    },
  ];
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full rounded-sm border border-gray-200 h-full">
      <h1 className="text-xl font-bold text-center mb-3 mt-6">
        Thống kê danh sách đơn hàng
      </h1>
      <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4">
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium text-lg ">
              Thống kê đơn hàng theo ngày
            </strong>
            <DatePicker
              format={"MM/YYYY"}
              picker="month"
              placeholder="Chọn tháng"
              onChange={(value) => setMonth(value ? value?.format() : "")}
            />
          </div>
          <div className="mt-3 w-full text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={dataOrdersDayByMonth}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="unSuccess" stroke="#00D8FF" />
                <Line type="monotone" dataKey="success" stroke="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#ff4d4d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium text-lg ">
              Thống kê đơn hàng theo tháng
            </strong>
            <Select
              value={year}
              style={{ minWidth: 90 }}
              onChange={(value) => setYear(value)}>
              {yearList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={monthYearOrderData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="unSuccess" stroke="#00D8FF" />
                <Line type="monotone" dataKey="success" stroke="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#ff4d4d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 min-h-[22rem] mt-2">
        <div className="flex items-center justify-center w-[20rem] h-[22rem] p-4 rounded-sm border border-gray-200">
          <div className="w-full max-w-[350px]">
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
        <div className="flex items-center justify-center w-[20rem] h-[22rem] p-4 rounded-sm border border-gray-200">
          <div className="w-full max-w-[350px]">
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
        <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê đơn hàng theo năm
            </strong>
            <Select
              value={year}
              style={{ minWidth: 90 }}
              onChange={(value) => setYear(value)}>
              {yearList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full max-w-[300px] text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataYearlyChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="unSuccess" fill="#00D8FF" />
                <Bar dataKey="success" fill="#82ca9d" />
                <Bar dataKey="total" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
