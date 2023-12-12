import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar } from "../../assets";
import { isActiveStyles, isNotActiveStyles } from "../../assets/css/styles";
import { motion } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/user.api";
import { resetUser, setUser } from "../../redux/slice/user.slice";
import { setNullAlert, setSuccessAlert } from "../../redux/slice/alert.slice";
import { isJsonString } from "../../utils/function";
import jwt_decode from "jwt-decode";
import { BackHome, CartIcon } from "../../components";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const [isMenu, setIsMenu] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const { decoded, storageData } = handleDecoded();
    if (decoded?.id && !user?.email) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  //lay access_token trong localStorage va chuyen sang JSON
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      //chuyen tu dang token sang json
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(setUser({ ...res?.data, access_token: token }));
  };
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
    <header className="fixed backdrop-blur-md z-50  top-0 flex items-center justify-between px-8 md:px-20 py-6 w-full">
      <BackHome />
      <nav className="flex items-center justify-center gap-3 sm:ml-auto md:gap-6 lg:gap-8 ">
        <ul className="hidden sm:flex items-center justify-center gap-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}>
            Trang chủ
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}>
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/news"}>
            Tin tức
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}>
            Liên hệ
          </NavLink>
        </ul>
        <CartIcon />
        {Boolean(user?.email) ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseLeave={() =>
                setTimeout(() => {
                  setIsMenu(false);
                }, 300)
              }
              onMouseEnter={() => setIsMenu(true)}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={user?.avatar ? user.avatar : Avatar}
                  alt="avatar"
                  className=" w-full h-full object-cover active:scale-95 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  onMouseLeave={() =>
                    setTimeout(() => {
                      setIsMenu(false);
                    }, 300)
                  }
                  className="px-4 py-3 w-36 bg-gray-200/80 xl:text-xl rounded-md absolute top-10 right-0 shadow-md backdrop-blur-md flex flex-col gap-2">
                  {user?.role === 1 && (
                    <Link
                      className="hover:text-blue-500 text-base text-textColor font-semibold"
                      to={"/admin/home"}>
                      Trang quản lý
                    </Link>
                  )}
                  {user?.role === 2 && (
                    <Link
                      className="hover:text-blue-500 text-base text-textColor font-semibold"
                      to={"/staff/home"}>
                      Trang quản lý
                    </Link>
                  )}
                  <Link
                    className="hover:text-blue-500 text-base text-textColor font-semibold"
                    to={"/user/profile"}>
                    Trang cá nhân
                  </Link>
                  <Link
                    className="hover:text-blue-500 text-base text-textColor font-semibold"
                    to={"/user/orders/all"}>
                    Đơn hàng
                  </Link>
                  <div
                    className="hover:text-blue-500 text-base active:scale-95 flex items-center text-textColor font-semibold gap-2"
                    onClick={handleLogout}>
                    <HiOutlineLogout className="text-xl group-hover:text-headingColor" />
                    <p className="group-hover:text-headingColor">Đăng xuất</p>
                  </div>
                  <div className="active:scale-95 flex items-center justify-center  text-textColor  shadow-md hover:bg-gray-200 gap-3"></div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <button className="px-4 py-2 xl:px-6 rounded-md shadow-md bg-white border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white active:scale-95 ">
                Đăng nhập
              </button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
