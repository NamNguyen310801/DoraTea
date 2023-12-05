import { useEffect, useState } from "react";
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
import { getOrdersMonthCountAPI } from "../../../../service/order.api";
import { setOrderCountList } from "../../../../redux/slice/orderMonth.slice";
export default function TransactionChart() {
  const dispatch = useDispatch();
  const orderMonthCountList = useSelector(
    (state) => state.orderMonth.orderMonthCountList
  );
  const [data, setData] = useState([]);
  // const currentYear = new Date().getFullYear();
  useEffect(() => {
    if (orderMonthCountList) {
      handleGetOrder();
    }
    setData([
      {
        name: "Tháng 1",
        amount: (orderMonthCountList && orderMonthCountList?.data[1]) || 0,
      },
      {
        name: "Tháng 2",
        amount: (orderMonthCountList && orderMonthCountList?.data[2]) || 0,
      },
      {
        name: "Tháng 3",
        amount: (orderMonthCountList && orderMonthCountList?.data[3]) || 0,
      },
      {
        name: "Tháng 4",
        amount: (orderMonthCountList && orderMonthCountList?.data[4]) || 0,
      },
      {
        name: "Tháng 5",
        amount: (orderMonthCountList && orderMonthCountList?.data[5]) || 0,
      },
      {
        name: "Tháng 6",
        amount: (orderMonthCountList && orderMonthCountList?.data[6]) || 0,
      },
      {
        name: "Tháng 7",
        amount: (orderMonthCountList && orderMonthCountList?.data[7]) || 0,
      },
      {
        name: "Tháng 8",
        amount: (orderMonthCountList && orderMonthCountList?.data[8]) || 0,
      },
      {
        name: "Tháng 9",
        amount: (orderMonthCountList && orderMonthCountList?.data[9]) || 0,
      },
      {
        name: "Tháng 10",
        amount: (orderMonthCountList && orderMonthCountList?.data[10]) || 0,
      },
      {
        name: "Tháng 11",
        amount: (orderMonthCountList && orderMonthCountList?.data[11]) || 0,
      },
      {
        name: "Tháng 12",
        amount: (orderMonthCountList && orderMonthCountList?.data[12]) || 0,
      },
    ]);
  }, [orderMonthCountList]);

  const handleGetOrder = async () => {
    const res = await getOrdersMonthCountAPI();
    if (res.status === "OK") {
      dispatch(setOrderCountList(res?.data));
    } else {
      console.log(res.message);
    }
  };

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
            <Bar dataKey="Số lượng" fill="#A2B5CD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
