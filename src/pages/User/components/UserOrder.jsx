import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../../../assets/css/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOrderList } from "../../../redux/slice/order.slice";
import { getAllOrderDetailsAPI } from "../../../service/order.api";
import { OrderItem } from "../../../components";
import { emptyOrder } from "../../../assets";
import Fuse from "fuse.js";
export default function UserOrder() {
  const user = useSelector((state) => state.user.user);
  const orderList = useSelector((state) => state.order.orderList);
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setSearchText(value.toLowerCase());
    }, 300);
  };
  useEffect(() => {
    if (orderList?.length === 0) {
      getOrderList();
    }
  }, []);
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults(orderList);
    } else {
      // Tạo một đối tượng Fuse với tùy chọn cài đặt tìm kiếm fuzzy
      const options = {
        includeScore: true,
        keys: ["_id", "orderItems.product.name"],
        threshold: 0.2,
      };
      const fuse = new Fuse(orderList, options);
      // Thực hiện tìm kiếm và cập nhật kết quả
      const results = fuse.search(searchText);
      setSearchResults(results.map((result) => result.item));
    }
  }, [searchText, orderList]);

  const getOrderList = async () => {
    const res = await getAllOrderDetailsAPI(user?.id);
    if (res.status === "OK") {
      dispatch(setOrderList(res.data));
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="py-4">
        <h1 className="text-lg text-gray-600 font-semibold">
          Đơn hàng của tôi
        </h1>
        <div className="text-sm text-gray-500 ">
          Danh sách thông tin đơn hàng
        </div>
      </div>
      <nav className="flex items-center py-4 justify-center gap-3 sm:ml-auto md:gap-6 lg:gap-8 w-full sticky overflow-hidden mb-3 top-0 z-10 bg-white border-t-[2px] border-b-[2px]">
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="all">
          Tất cả
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="wait-payment">
          Chờ thanh toán
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="wait-confirm">
          Chờ xác nhận
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="delivering">
          Đang giao
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="delivered">
          Đã giao
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="completed">
          Hoàn thành
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to="cancelled">
          Đã hủy
        </NavLink>
      </nav>
      <div />
      <section className="flex justify-center items-center pb-4 w-full">
        <div className="group relative h-10 flex justify-center items-center w-full">
          <HiOutlineSearch
            fontSize={20}
            className="group-focus:text-gray-800 text-gray-400 translate-x-[200%]"
          />
          <input
            onChange={(e) => handleSearchChange(e)}
            type="text"
            placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
            className="text-sm outline-none border border-gray-300 w-[60%] h-10 pl-11 pr-4 max-w-[600px] rounded-full"
          />
        </div>
      </section>
      <main className="border-t w-full mx-auto max-w-[1024px]">
        {orderList?.length === 0 && (
          <img src={emptyOrder} alt="" className="w-full" />
        )}
        <Routes>
          <Route
            path="all"
            element={
              <>
                {searchResults?.map((item) => (
                  <OrderItem data={item} key={item?._id} />
                ))}
              </>
            }
          />
          <Route
            path="/wait-payment"
            element={
              <>
                {searchResults
                  ?.filter(
                    (item) =>
                      !item?.isPaid &&
                      !item?.isSuccessOrder &&
                      !item?.isCancelled
                  )
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
          <Route
            path="/wait-confirm"
            element={
              <>
                {searchResults
                  ?.filter(
                    (item) =>
                      !item?.isConfirm &&
                      !item?.isDelivered &&
                      !item?.isSuccessOrder &&
                      !item?.isCancelled
                  )
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
          <Route
            path="/delivering"
            element={
              <>
                {searchResults
                  ?.filter(
                    (item) =>
                      !item?.isDelivered &&
                      !item?.isSuccessOrder &&
                      !item?.isCancelled &&
                      item?.isConfirm
                  )
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
          <Route
            path="/delivered"
            element={
              <>
                {searchResults
                  ?.filter(
                    (item) =>
                      item?.isDelivered &&
                      item?.isConfirm &&
                      !item?.isSuccessOrder &&
                      !item?.isCancelled
                  )
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
          <Route
            path="/completed"
            element={
              <>
                {searchResults
                  ?.filter(
                    (item) =>
                      item?.isDelivered &&
                      item?.isSuccessOrder &&
                      !item?.isCancelled
                  )
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
          <Route
            path="/cancelled"
            element={
              <>
                {searchResults
                  ?.filter((item) => item?.isCancelled)
                  ?.map((item) => (
                    <OrderItem data={item} key={item?._id} />
                  ))}
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
