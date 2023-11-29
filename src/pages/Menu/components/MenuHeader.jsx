import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { Logo, Avatar } from "../../../assets";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import * as UserService from "../../../service/user.api";
import { resetUser } from "../../../redux/slice/user.slice";
import {
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { CartIcon } from "../../../components";

export default function MenuHeader() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //log out
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(setSuccessAlert("Đăng xuất thành công"));
    setTimeout(() => {
      dispatch(resetUser());
      dispatch(setNullAlert());
    }, 500);
  };
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 bg-slate-100 top-0 flex items-center justify-between px-8 md:px-20 py-4 w-full">
      <NavLink
        to={"/"}
        className="active:scale-95 flex items-center gap-1 justify-center sm:min-w-[120px]">
        <img src={Logo} alt="Logo" className="w-12 xl:w-14" />
        <p className="text-xl xl:text-2xl text-blue-600 font-semibold ">
          DoraTea
        </p>
      </NavLink>
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-full"
        />
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <CartIcon />
        {Boolean(user?.email) ? (
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="ml-2 bg-transparent flex text-sm rounded-full outline-none">
                <div className="h-10 w-10 rounded-full object-cover overflow-hidden">
                  <img
                    src={user?.avatar ? user.avatar : Avatar}
                    alt="avatar"
                    className="w-full"
                  />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-32 text-sm rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/user/profile")}
                      className={classNames(
                        active && "bg-gray-100",
                        "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                      )}>
                      Tài khoản
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/user/orders/all")}
                      className={classNames(
                        active && "bg-gray-100",
                        "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                      )}>
                      Đơn hàng
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleLogout}
                      className={classNames(
                        active && "bg-gray-100",
                        "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                      )}>
                      Đăng xuất
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <>
            <NavLink to={"/login"}>
              <button className="font-semibold text-gray-500 px-4 py-2 xl:px-6 rounded-[25px] shadow-md bg-white border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white active:scale-95 ">
                Đăng nhập
              </button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
