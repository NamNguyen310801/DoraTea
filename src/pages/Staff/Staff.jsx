import { Layout } from "antd";
import StaffContent from "./StaffContent/StaffContent";
import StaffPage from "./StaffPage/StaffPage";
import StaffHeader from "./StaffHeader/StaffHeader";
import * as UserService from "../../service/user.api";
import * as ProductService from "../../service/product.api";
import { useEffect } from "react";
import { setUserList } from "../../redux/slice/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { setErrAlert, setNullAlert } from "../../redux/slice/alert.slice";
import { setProductList } from "../../redux/slice/product.slice";
import {
  getAllOrderAPI,
  getOrdersMonthCountAPI,
  getRecentOrderAPI,
} from "../../service/order.api";
import {
  setAllOrderList,
  setRecentOrderList,
} from "../../redux/slice/order.slice";
import { setOrderCountList } from "../../redux/slice/orderMonth.slice";
export default function Staff() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const productList = useSelector((state) => state.product.productList);
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const user = useSelector((state) => state.user.user);
  const recentOrderList = useSelector((state) => state.order.recentOrderList);
  const orderMonthCountList = useSelector(
    (state) => state.orderMonth.orderMonthCountList
  );
  useEffect(() => {
    if (!userList) {
      handleGetAllUser();
    }
  }, []);

  useEffect(() => {
    if (!productList) {
      handleGetAllProduct();
    }
  }, []);

  useEffect(() => {
    if (!allOrderList) {
      handleGetAllOrderList();
    }
  }, [allOrderList]);

  useEffect(() => {
    if (!recentOrderList) {
      handleGetRecentOrder();
    }
  }, [recentOrderList]);

  useEffect(() => {
    if (!orderMonthCountList) {
      handleGetOrder();
    }
  }, [orderMonthCountList]);
  // Lay danh sach
  const handleGetAllUser = async () => {
    const res = await UserService.getAllUser();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
  };
  const handleGetAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
  };
  // Lay danh sach don hang
  const handleGetAllOrderList = async () => {
    const res = await getAllOrderAPI(user?.access_token);
    if (res.status === "OK") {
      dispatch(setAllOrderList(res.data));
    } else {
      console.log(res.message);
    }
  };
  //
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

  const handleGetOrder = async () => {
    const res = await getOrdersMonthCountAPI();
    if (res.status === "OK") {
      dispatch(setOrderCountList(res?.data));
    } else {
      console.log(res.message);
    }
  };
  return (
    <>
      <Layout>
        <StaffPage />
        <Layout className="bg-lightOverlay ">
          <StaffHeader />
          <StaffContent />
        </Layout>
      </Layout>
    </>
  );
}
