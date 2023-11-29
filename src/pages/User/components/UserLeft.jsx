import React from "react";
import { Avatar } from "../../../assets";
import { Link, NavLink } from "react-router-dom";
import { MdHome, MdOutlineSell } from "react-icons/md";
import { BiPencil, BiUser, BiBell, BiReceipt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../service/user.api";
import {
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { resetUser } from "../../../redux/slice/user.slice";
import { HiOutlineLogout } from "react-icons/hi";
export default function UserLeft() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  //log out
  const handleLogout = async () => {
    await logoutUser();
    dispatch(setSuccessAlert("Đăng xuất thành công"));
    setTimeout(() => {
      dispatch(resetUser());
      dispatch(setNullAlert());
    }, 1000);
  };
  return (
    <div className="min-w-[180px] flex flex-col w-1/5 h-screen">
      <div className="flex w-full py-4 items-center ">
        <img
          src={user?.avatar ? user?.avatar : Avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-headingColor overflow-ellipsis capitalize overflow-hidden whitespace-nowrap font-semibold text-base">
            {user?.name || "Your name"}
          </h4>
          <Link
            to={"/user/profile"}
            className="flex items-center text-gray-500">
            <BiPencil className="font-semibold  text-lg" />
            <span className="ml-2">Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-40">
        <div className="flex flex-col w-full mt-6 gap-4">
          <NavLink
            to={"/user/profile"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <BiUser className="text-xl text-blue-400 mr-3" />
            <div>Tài khoản của tôi</div>
          </NavLink>
          <NavLink
            to={"/user/orders/all"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <BiReceipt className="text-xl text-blue-500 mr-3" />
            <div>Đơn Mua</div>
          </NavLink>
          <NavLink
            to={"/user/notify"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <BiBell className="text-xl text-red-500 mr-3" />
            <div>Thông báo</div>
          </NavLink>
          <NavLink
            to={"/user/voucher"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <MdOutlineSell className="text-xl text-red-400 mr-3" />
            <div>Ưu đãi</div>
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <MdHome className="text-xl text-gray-600 mr-3" />
            <div>Home</div>
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-base font-normal flex items-center`
                : `flex items-center text-gray-600 text-base font-normal`
            }>
            <div
              className="hover:text-blue-500 text-base active:scale-95 flex items-center text-textColor font-normal"
              onClick={handleLogout}>
              <HiOutlineLogout className="text-xl group-hover:text-headingColor mr-3" />
              <p className="group-hover:text-headingColor">Đăng xuất</p>
            </div>
          </NavLink>
        </div>
        <div className="w-full items-center justify-center flex h-225 mt-auto px-2 ">
          <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
            <div className="flex items-center justify-center border bg-primary w-12 h-12 rounded-full">
              <p className="font-bold text-red-500 text-2xl">?</p>
            </div>
            <p className="text-primary text-center text-base font-bold">
              Help Center
            </p>
            <p className="text-primary text-center text-sm">
              Having trouble in Dora. Please contact us for more questions
            </p>
            <p className="px-4 py-2 bg-primary  cursor-pointer rounded-full text-red-400 text-sm font-semibold">
              Get in touch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
