import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOrdersByMonthAPI } from "../../../../service/order.api";
import * as OrderMonthSlice from "../../../../redux/slice/orderMonth.slice";
export default function TransactionChart() {
  const user = useSelector((state) => state.user.user);
  const order1 = useSelector((state) => state.order.order1);
  const order2 = useSelector((state) => state.order.order2);
  const order3 = useSelector((state) => state.order.order3);
  const order4 = useSelector((state) => state.order.order4);
  const order5 = useSelector((state) => state.order.order5);
  const order6 = useSelector((state) => state.order.order6);
  const order7 = useSelector((state) => state.order.order7);
  const order8 = useSelector((state) => state.order.order8);
  const order9 = useSelector((state) => state.order.order9);
  const order10 = useSelector((state) => state.order.order10);
  const order11 = useSelector((state) => state.order.order11);
  const order12 = useSelector((state) => state.order.order12);

  const dispatch = useDispatch();
  useEffect(() => {
    handleGetOrder(1, OrderMonthSlice.setOrderMonth1);
    handleGetOrder(2, OrderMonthSlice.setOrderMonth2);
    handleGetOrder(3, OrderMonthSlice.setOrderMonth3);
    handleGetOrder(4, OrderMonthSlice.setOrderMonth4);
    handleGetOrder(5, OrderMonthSlice.setOrderMonth5);
    handleGetOrder(6, OrderMonthSlice.setOrderMonth6);
    handleGetOrder(7, OrderMonthSlice.setOrderMonth7);
    handleGetOrder(8, OrderMonthSlice.setOrderMonth8);
    handleGetOrder(9, OrderMonthSlice.setOrderMonth9);
    handleGetOrder(10, OrderMonthSlice.setOrderMonth10);
    handleGetOrder(11, OrderMonthSlice.setOrderMonth11);
    handleGetOrder(12, OrderMonthSlice.setOrderMonth12);
  }, [
    order1,
    order2,
    order3,
    order4,
    order5,
    order6,
    order7,
    order8,
    order9,
    order10,
    order11,
    order12,
  ]);

  const currentYear = new Date().getFullYear();
  // Lay danh sach don hang theo thang
  // const handleGetOrderByMonth = async () => {
  //   monthList.map(async (month) => {
  //     const res = await getOrdersByMonthAPI(
  //       user?.access_token,
  //       currentYear,
  //       month.value
  //     );
  //     if (res.status === "OK") {
  //       const orderMonth = { name: month?.name, amount: res?.data };
  //       setOrderMonthList((prev) => [...prev, orderMonth]);
  //     } else {
  //       console.log(res.message);
  //     }
  //   });
  // };
  const handleGetOrder = async (month, setOrderMonth) => {
    const res = await getOrdersByMonthAPI(
      user?.access_token,
      currentYear,
      month
    );
    if (res.status === "OK") {
      dispatch(setOrderMonth(res?.data));
    } else {
      console.log(res.message);
    }
  };

  const data = [
    {
      name: "Jan",
      amount: order1?.length,
    },
    {
      name: "Feb",
      amount: order2?.length,
    },
    {
      name: "Mar",
      amount: order3?.length,
    },
    {
      name: "Apr",
      amount: order4?.length,
    },
    {
      name: "May",
      amount: order5?.length,
    },
    {
      name: "Jun",
      amount: order6?.length,
    },
    {
      name: "July",
      amount: order7?.length,
    },
    {
      name: "Aug",
      amount: order8?.length,
    },
    {
      name: "Sep",
      amount: order9?.length,
    },
    {
      name: "Oct",
      amount: order10?.length,
    },
    {
      name: "Nov",
      amount: order11?.length,
    },
    {
      name: "Dec",
      amount: order12?.length,
    },
  ];
  console.log(data);
  return (
    <div className="h-full bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Thống kê giao dịch</strong>
      <div className="mt-3 w-full flex-1 text-xs flex items-center justify-center">
        <ResponsiveContainer width="75%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
