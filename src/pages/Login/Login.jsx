import { useState } from "react";
import { Logo, doraLogin } from "../../assets";
import { FcGoogle } from "react-icons/fc";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { LoginInput } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../redux/slice/alert.slice";
import * as UserService from "../../service/user.api";
import jwt_decode from "jwt-decode";
import { setUser } from "../../redux/slice/user.slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const data = {
    email: userEmail,
    password: password,
  };
  const LoginWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.loginUser(data);
      // Hiển thị thông báo lỗi từ máy chủ
      if (res && res.status === "ERROR") {
        dispatch(setWarningAlert(res.message));
        setTimeout(() => {
          dispatch(setNullAlert());
        }, 2000);
      }
      // Hiển thị thành công
      else if (res.status === "OK") {
        console.log(res);
        localStorage.setItem("access_token", JSON.stringify(res?.access_token));
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(res?.refresh_token)
        );
        if (res?.access_token) {
          const decoded = jwt_decode(res.access_token);
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, res?.access_token);
          }
        }
        dispatch(setSuccessAlert("Đăng nhập thành công"));
        setTimeout(() => {
          if (location?.state) {
            navigate(location?.state);
          } else {
            navigate("/");
          }
          dispatch(setNullAlert());
        }, 2000);
      }
    } catch (error) {
      dispatch(setErrAlert(error));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailUser(id, token);
    dispatch(
      setUser({
        ...res?.data,
        access_token: token,
        refresh_token: refreshToken,
      })
    );
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* background img */}
      <img
        src="https://wallpapercave.com/wp/wp2609776.jpg"
        alt="background login"
        className="w-full h-full object-cover absolute top-0 left-0 "
      />
      {/* content box*/}
      <div className="flex flex-col items-center bg-lightTextGray w-full sm:w-4/6 md:w-508 h-full z-10 backdrop-blur-md px-4 py-12 gap-6">
        {/* Logo section */}
        <div className="flex inset-x-0 justify-start w-full  items-center gap-2">
          <img src={Logo} alt="logo" className="w-10" />
          <span className="text-headingColor font-semibold text-2xl">
            DoraTea
          </span>
        </div>
        {/* text */}
        <p className="text-3xl font-bold bg-gradient-to-r to-[#003dbd] from-[#ffc500] bg-clip-text text-transparent">
          Welcome to DoraTea
        </p>
        <div className="w-32 h-[80px] overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={doraLogin} alt="LoginImage" className="w-full h-full" />
        </div>
        <p className="text-xl text-textColor mt-2">Đăng nhập với chúng tôi</p>
        {/* input section */}
        <form
          onSubmit={(e) => LoginWithEmailPassword(e)}
          className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email"}
            inputState={userEmail}
            icon={<EmailIcon />}
            InputStateFunc={setUserEmail}
            type="email"
          />
          <LoginInput
            placeHolder={"Password"}
            inputState={password}
            icon={<KeyIcon />}
            InputStateFunc={setPassword}
            type="password"
          />

          {/* button section */}

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-red-400 text-center text-white hover:scale-105 hover:bg-red-500 transition-all duration-150 capitalize text-xl cursor-pointer">
            Đăng nhập
          </button>

          <div className="w-full">
            <Link
              to={"/forget-password"}
              className="text-blue-400 cursor-pointer bg-transparent active:scale-95 hover:text-blue-500">
              Quên mật khẩu?
            </Link>
            <p>
              Bạn chưa có tải khoản:{" "}
              <Link
                to={"/signup"}
                className="text-red-400 underline cursor-pointer bg-transparent active:scale-95 hover:text-red-500">
                Đăng ký tại đây
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between gap-16">
            <div className="w-24 bg-white rounded-md h-[1px]"></div>
            <p className="text-white">or</p>
            <div className="w-24 bg-white rounded-md h-[1px]"></div>
          </div>
          <div className="flex items-center justify-center px-20 py-2 bg-gray-100 backdrop-blur-md rounded-full w-full gap-4 hover:scale-105 cursor-pointer">
            <FcGoogle className="text-3xl" />
            <button className="capitalize text-base font-medium text-headingColor transition-all duration-150">
              Tiếp tục với Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
