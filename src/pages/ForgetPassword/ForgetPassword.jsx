import { useEffect, useState } from "react";
import { Logo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import {
  forgetPasswordAPI,
  resetPasswordAPI,
  verifyOtpAPI,
} from "../../service/user.api";
import { useDispatch } from "react-redux";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../redux/slice/alert.slice";
import { getRegexPassword } from "../../utils/stringsUtils";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [disable, setDisable] = useState(true);
  const [timer, setTimer] = useState(60);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const data = {
    email: email,
    newPassword: password,
    confirmPassword: confirmPassword,
  };
  useEffect(() => {
    let intervalId;
    if (disable) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      if (timer <= 0) {
        setDisable(false);
        clearInterval(intervalId);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [disable, timer]);
  const handleGetEmail = async () => {
    const res = await forgetPasswordAPI({ email });
    if (res && res.status === "ERROR") {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else {
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
      setIsEmail(false);
      setIsVerify(true);
      setIsConfirm(false);
      setDisable(true);
      setTimer(60);
    }
  };
  const handleVerify = async () => {
    const res = await verifyOtpAPI({ email, otp });
    console.log(res);
    if (res && res.status === "ERROR") {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else {
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
      setIsEmail(false);
      setIsVerify(false);
      setIsConfirm(true);
      setDisable(false);
    }
  };
  const handleConfirm = async () => {
    if (password === "" || confirmPassword === "") {
      dispatch(setWarningAlert("Vui lòng nhập đủ thông tin"));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else if (!getRegexPassword().test(password)) {
      dispatch(
        setWarningAlert(
          "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !."
        )
      );
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else if (password !== confirmPassword) {
      dispatch(setWarningAlert("Mật khẩu không trùng khớp"));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else {
      const res = await resetPasswordAPI(data);
      if (res && res.status === "ERROR") {
        dispatch(setErrAlert(res.message));
        setTimeout(() => {
          dispatch(setNullAlert());
        }, 1000);
      } else {
        dispatch(setSuccessAlert(res.message));
        setTimeout(() => {
          dispatch(setNullAlert());
          navigate("/login");
        }, 1000);
        setIsEmail(true);
        setIsVerify(false);
        setIsConfirm(false);
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <div className="fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full bg-gray-400 bg-opacity-20 backdrop-blur-sm min-h-[750px]">
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
        <div className="relative flex w-full flex-col  overflow-hidden rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <div className="h-[600px] flex flex-col items-center justify-center bg-white rounded-md px-[120px]">
            <img className="w-[200px] mb-5" src={Logo} />
            {isEmail && (
              <input
                className="py-3 text-sm border-b border-[#a5e585] w-full outline-none shadow-none"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập Email của bạn"
              />
            )}
            {isVerify && (
              <input
                className="py-3 text-sm border-b border-[#a5e585] w-full outline-none shadow-none"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã OTP của bạn"
              />
            )}
            {isConfirm && (
              <>
                <input
                  className="py-3 text-sm border-b border-[#a5e585] w-full outline-none shadow-none"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới của bạn"
                />
                <input
                  className="py-3 text-sm border-b border-[#a5e585] w-full outline-none shadow-none"
                  type="text"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu mới của bạn"
                />
              </>
            )}
            {isVerify && (
              <div className="flex items-center justify-center text-center text-sm font-medium text-gray-500 gap-x-2 mt-2">
                <p>Bạn chưa nhận được mã</p>
                <span
                  className="flex items-center"
                  style={{
                    color: disable ? "gray" : "blue",
                    cursor: disable ? "none" : "pointer",
                    textDecorationLine: disable ? "none" : "underline",
                  }}
                  onClick={() => handleGetEmail()}>
                  {disable ? `Gửi lại mã trong ${timer}s` : "Gửi lại mã"}
                </span>
              </div>
            )}
            {isEmail && (
              <div
                className="bg-[#60a94f] hover:bg-[#60a94f] text-white mt-6 text-sm overflow-visible min-h-[42px] h-auto flex items-center justify-center w-full px-2 py-3 rounded-full cursor-pointer font-bold uppercase"
                onClick={handleGetEmail}>
                Tiếp theo
              </div>
            )}
            {isVerify && (
              <div
                className="bg-[#60a94f] hover:bg-[#60a94f] text-white mt-4 text-sm overflow-visible min-h-[42px] h-auto flex items-center justify-center w-full px-2 py-3 rounded-full cursor-pointer font-bold uppercase"
                onClick={handleVerify}>
                Tiếp theo
              </div>
            )}
            {isConfirm && (
              <div
                className="bg-[#60a94f] hover:bg-[#60a94f] text-white mt-6 text-sm overflow-visible min-h-[42px] h-auto flex items-center justify-center w-full px-2 py-3 rounded-full cursor-pointer font-bold uppercase"
                onClick={handleConfirm}>
                Xác nhận
              </div>
            )}

            <div className="flex mt-8 justify-center items-center">
              <Link
                to={"/signup"}
                className="text-[#60a94f] font-semibold mx-3 cursor-pointer hover:">
                Tạo tài khoản
              </Link>
              <Link
                to={"/login"}
                className="text-[#60a94f]  font-semibold mx-3 cursor-pointer">
                Đăng nhập
              </Link>
            </div>
            <div className="flex justify-center my-5">
              <Link
                to={"/"}
                className="text-blue-500 hover:text-blue-700 hover:underline">
                Quay lại màn hình chính
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
