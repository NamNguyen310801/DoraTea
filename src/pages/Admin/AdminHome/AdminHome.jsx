import {
  BuyerProfilePieChart,
  DashboardStatsGrid,
  PopularProducts,
  RecentOrders,
  TransactionChart,
} from "./components";
import { OrderAdminDetail } from "../AdminOrder";
import { setShowOrder } from "../../../redux/slice/loading.slice";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { getRecentOrderAPI } from "../../../service/order.api";
import { setRecentOrderList } from "../../../redux/slice/order.slice";
import { setErrAlert, setNullAlert } from "../../../redux/slice/alert.slice";
import { getPopularProduct } from "../../../service/product.api";
import { setPopularList } from "../../../redux/slice/product.slice";
export default function AdminHome() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(setShowOrder(false));
  };
  const handleGetAll = () => {
    handleGetRecentOrder();
    getPopularList();
  };
  const handleGetRecentOrder = async () => {
    const res = await getRecentOrderAPI(user?.access_token);
    if (res.status === "OK") {
      dispatch(setRecentOrderList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
  };
  const getPopularList = async () => {
    const res = await getPopularProduct();
    if (res.status === "OK") {
      dispatch(setPopularList(res.data));
    }
  };
  return (
    <div className="relative flex flex-col gap-4 h-auto">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full h-[430px]">
        <RecentOrders />
        <PopularProducts />
      </div>
      <OrderAdminDetail onClose={handleOnClose} />
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAll}
      />
    </div>
  );
}
