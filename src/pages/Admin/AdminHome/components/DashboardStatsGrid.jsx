import React, { useEffect } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import CountUp from "react-countup";
import { Statistic } from "antd";
import * as UserService from "../../../../service/user.api";
import * as CategoryService from "../../../../service/category.api";
import * as ProductService from "../../../../service/product.api";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../../../../redux/slice/product.slice";
import { setAllCategory } from "../../../../redux/slice/category.slice";
import { setUserList } from "../../../../redux/slice/user.slice";
import { setErrAlert } from "../../../../redux/slice/alert.slice";
export default function DashboardStatsGrid() {
  const allOrderList = useSelector((state) => state.order.allOrderList);
  const userList = useSelector((state) => state.user.userList);
  const allCategory = useSelector((state) => state.category.allCategory);

  const productList = useSelector((state) => state.product.productList);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!productList) {
      handleGetAllProduct();
    }
  }, []);
  useEffect(() => {
    if (!allCategory) {
      handleGetCategory();
    }
  }, []);
  useEffect(() => {
    if (!userList) {
      handleGetAllUser();
    }
  }, []);

  // Lay danh sach san pham
  const handleGetAllUser = async () => {
    const res = await UserService.getAllUser();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    } else {
      setErrAlert(res.message);
    }
  };
  const handleGetAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      console.log(res.message);
    }
  };
  const handleGetCategory = async () => {
    const res = await CategoryService.getAllCategory();
    if (res.status === "OK") {
      dispatch(setAllCategory(res.data));
    } else {
      console.log(res.message);
    }
  };
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng sản phẩm"
              value={productList?.length}
              formatter={formatter}
            />
            {/* <span className="text-sm text-green-500 pl-2">+0</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng thể loại"
              value={allCategory?.length}
              formatter={formatter}
            />
            {/* <span className="text-sm text-green-500 pl-2">-0</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng người dùng"
              value={userList?.length}
              formatter={formatter}
            />
            {/* <span className="text-sm text-red-500 pl-2">-30</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng đơn hàng"
              value={allOrderList?.length}
              formatter={formatter}
            />
            {/* <span className="text-sm text-red-500 pl-2">-43</span> */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
