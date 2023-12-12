import {
  BuyerProfilePieChart,
  DashboardStatsGrid,
  PopularProducts,
  RecentOrders,
  TransactionChart,
} from "./components";
import { OrderStaffDetail } from "../StaffOrder";
import { setShowOrder } from "../../../redux/slice/loading.slice";
import { useDispatch } from "react-redux";
export default function StaffHome() {
  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(setShowOrder(false));
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
      <OrderStaffDetail onClose={handleOnClose} />
    </div>
  );
}
