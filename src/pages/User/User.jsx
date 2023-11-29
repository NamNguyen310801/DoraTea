import { useDispatch, useSelector } from "react-redux";
import UserLeft from "./components/UserLeft";
import UserRight from "./components/UserRight";
import { useEffect } from "react";
import { getAllOrderDetailsAPI } from "../../service/order.api";
import { setOrderList } from "../../redux/slice/order.slice";
export default function User() {
  const orderList = useSelector((state) => state.order.orderList);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderList?.length === 0) {
      getOrderList();
    }
  }, []);
  const getOrderList = async () => {
    const res = await getAllOrderDetailsAPI(user?.id);
    if (res.status === "OK") {
      dispatch(setOrderList(res.data));
    }
  };
  return (
    <div
      className="container mx-auto flex
    ">
      <UserLeft />
      <UserRight />
    </div>
  );
}
