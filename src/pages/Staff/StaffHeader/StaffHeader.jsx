import { Avatar } from "../../../assets";
import React, { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../service/user.api";
import {
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { resetUser } from "../../../redux/slice/user.slice";
export default function StaffHeader() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  //log out
  const handleLogout = async () => {
    await logoutUser();
    dispatch(setSuccessAlert("Đăng xuất thành công"));
    setTimeout(() => {
      dispatch(resetUser());
      dispatch(setNullAlert());
      navigate("/");
    }, 500);
  };
  return (
    <div className="bg-white w-full h-16 p-4 flex items-center border-b border-gray-200 justify-between">
      <div>
        <h3 className="text-xl text-headingColor">Welcome</h3>
        {user?.name && (
          <span className="block text-sm text-gray-500 ">{`Hello ${user?.name.substring(
            0,
            12
          )}...!`}</span>
        )}
      </div>
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
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}>
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Tin nhắn
                    </strong>
                    <div className="mt-2 py-1 text-sm">Danh sách tin nhắn.</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}>
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Thông báo
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      Danh sách thông báo.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

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
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {user?.email ? (
                <>
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
                        onClick={() => navigate("/settings")}
                        className={classNames(
                          active && "bg-gray-100",
                          "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                        )}>
                        Cài đặt
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
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() =>
                        navigate("/login", { state: location?.pathname })
                      }
                      className={classNames(
                        active && "bg-gray-100",
                        "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                      )}>
                      Đăng nhập
                    </div>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
