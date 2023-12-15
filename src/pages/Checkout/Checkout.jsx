import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { QRcode_pc, VN_atm } from "../../assets";
import { useNavigate } from "react-router-dom";
import { BackHome } from "../../components";
import { FaArrowLeft } from "react-icons/fa";
import * as OrderService from "../../service/order.api";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../redux/slice/alert.slice";
import { deleteManyCartItemAPI } from "../../service/cart.api";
import { setCartList } from "../../redux/slice/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder, setOrderList } from "../../redux/slice/order.slice";

export default function Checkout() {
  const dispatch = useDispatch();
  const orderCheckout = useSelector((state) => state.order.orderCheckout);
  const user = useSelector((state) => state.user.user);
  const cartList = useSelector((state) => state.cart.cartList);
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const ids = selectedOrder?.map((item) => item?._id);
  console.log(orderCheckout);
  const [isATM, setIsATM] = useState(false);
  const [isQR, setIsQR] = useState(false);
  const [dataOrder, setDataOrder] = useState(null);
  useEffect(() => {
    setDataOrder(orderCheckout);
  }, [orderCheckout]);
  const navigate = useNavigate();
  const createOrder = async () => {
    const res = await OrderService.createOrderAPI({
      ...dataOrder,
    });
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        dispatch(resetOrder());
        dispatch(setNullAlert());
      }, 2000);
      await deleteManyCartItemAPI(ids);
      dispatch(
        setCartList(cartList?.filter((item) => !ids.includes(item?._id)))
      );
      const orders = await OrderService.getAllOrderDetailsAPI(user?.id);
      if (orders.status === "OK") {
        dispatch(setOrderList(orders.data));
      }
      navigate("/createOrder");
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  return (
    <main className="pb-12 flex flex-col min-h-[800px] container mx-auto px-2 md:px-0">
      {/* back home */}
      <div className="w-full flex justify-between pt-4 py-4 items-center">
        <div className="text-left cursor-pointer" onClick={() => navigate(-1)}>
          <div className="flex items-center gap-x-1">
            <FaArrowLeft />
            Quay lại
          </div>
        </div>
        <h2 className=" text-lg md:text-xl 2xl:text-[28px] font-semibold text-blue-500">
          Thanh toán Online
        </h2>
        <BackHome />
      </div>
      <div className="w-full my-4 relative overflow-hidden">
        <div className="flex items-center w-full justify-center">
          <div>Chọn phương thức</div>
          <div
            className="relative flex items-center justify-center border-2 border-[#ececec]   bg-white max-w-[20%] flex-1 cursor-pointer"
            onClick={() => {
              setIsATM(true);
              setIsQR(false);
            }}>
            <div
              className={`w-full max-w-[148px] border-2 hover:border-red-700 ${
                isATM && "border-red-700"
              }`}>
              <div className="relative pb-[61.94%]">
                <img
                  className="absolute top-0 left-0 w-[96%] h-[96%] block m-[3px]"
                  src={VN_atm}
                />
              </div>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center border border-[#ececec] bg-white max-w-[20%] flex-1 cursor-pointer"
            onClick={() => {
              setIsATM(false);
              setIsQR(true);
            }}>
            <div
              className={`w-full max-w-[148px] border-2 hover:border-red-700 ${
                isQR && "border-red-700"
              }`}>
              <div className="relative pb-[61.94%]">
                <img
                  className="absolute top-0 left-0 w-[96%] h-[96%] block m-[3px]"
                  src={QRcode_pc}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-5">
        <div className="flex w-[400px] flex-shrink items-start">
          <div className="text-sm w-full">
            {/* QR */}
            {isQR && (
              <div className="flex flex-col items-center">
                <div className="mb-4 text-center break-words">
                  Quét mã QR dưới đây bằng ứng dụng Internet Banking để thanh
                  toán
                </div>
                <QRCode
                  size={180}
                  style={{
                    height: "auto",
                    maxWidth: "180px",
                    width: "180px",
                    padding: "10px",
                  }}
                  value={dataOrder?.totalPrice || 0}
                  viewBox={`0 0 180 180`}
                />
                <div className="text-[12px] text-gray-400 mb-[5px]">
                  Lưu ý: Mã QR này sẽ hết hạn sau 5 phút kể từ lúc tạo
                </div>
                {/* <div className="text-[12px] text-gray-400 mb-[5px]">
                  Số hoá đơn: 15080508221507371852
                </div> */}
              </div>
            )}
            {/* ATM */}
            {isATM && (
              <div className="flex flex-col justify-start gap-y-2">
                <div className="mb-2 text-center break-words">
                  Vui lòng chuyển khoản tới số tài khoản sau:
                </div>
                <div className="text-sm text-black w-full flex flex-col">
                  <div className="w-full">Ngân hàng VietcomBank:</div>
                  <div className="font-semibold w-full flex flex-col">
                    <div>STK: 0691015489747</div>
                    <div>Chủ sở hữu: Mai Thị Thanh Huyền</div>
                  </div>
                </div>
                <div className="text-sm text-black w-full flex flex-col">
                  <div className="w-full">Ngân hàng BIDV:</div>
                  <div className="font-semibold w-full flex flex-col">
                    <div>STK: 0546871324567</div>
                    <div>Chủ sở hữu: Mai Thị Thanh Huyền</div>
                  </div>
                </div>
                <div className="text-sm text-black w-full flex flex-col">
                  <div className="w-full">Nội dung chuyển khoản</div>
                  <div className="font-semibold w-full flex flex-col">
                    <div>MDH: Đơn hàng của bạn</div>
                    <div>Tên: {dataOrder?.fullName || ""}</div>
                    <div>SĐT: {dataOrder?.phone || ""}</div>
                  </div>
                </div>
              </div>
            )}
            {/* SUBMIT */}
            <div className="text-[12px] text-gray-400 my-[5px] text-center">
              Sau khi thanh toán, nhấp vào nút bên dưới
            </div>
            <div
              className="m-0 w-full cursor-pointer mt-5"
              onClick={createOrder}>
              <button className="w-full py-[10px]  transition-opacity duration-300 rounded-[3px] border-none bg-[#d43831] text-white hover:bg-red-500">
                Hoàn tất thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
