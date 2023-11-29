import { Tooltip } from "antd";
import React from "react";
import { BiRefresh } from "react-icons/bi";
import { BsArrowBarRight } from "react-icons/bs";
import { setCartList, setCartShow } from "../../../redux/slice/cart.slice";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { deleteCartAPI } from "../../../service/cart.api";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
export default function CartHeader() {
  const dispatch = useDispatch();
  const deleteCart = async () => {
    const res = await deleteCartAPI();
    if (res.status === "OK") {
      dispatch(setCartList([]));
      dispatch(setCartShow(false));
    }
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteCart();
      },
    });
  };
  return (
    <div className="w-full text-textColor border-b-2 flex items-center justify-between py-4">
      <div
        className="text-3xl active:scale-75 cursor-pointer "
        onClick={() => dispatch(setCartShow(false))}>
        <BsArrowBarRight />
      </div>
      <h3 className=" text-lg font-semibold">Giỏ hàng của bạn</h3>
      <Tooltip title="Xóa giỏ hàng" placement="bottomLeft" color="#75a0f0">
        <div
          className="text-3xl  active:scale-75 cursor-pointer flex items-center  gap-x-2 p-1 px-2 "
          onClick={() => showDeleteConfirm()}>
          <BiRefresh />
        </div>
      </Tooltip>
    </div>
  );
}
