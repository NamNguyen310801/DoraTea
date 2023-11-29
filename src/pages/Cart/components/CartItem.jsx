import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  deleteCartItem,
} from "../../../redux/slice/cart.slice";
import {
  deleteCartItemAPI,
  updateCartItemAPI,
} from "../../../service/cart.api";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { convertPrice } from "../../../utils/function";
const { confirm } = Modal;
export default function CartItem({ data }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { quantity, product } = data;
  const price =
    Math.round(
      (product?.price - product?.price * (product?.discount || 0) * 0.01) / 1000
    ) * 1000;

  const handleIncrease = async () => {
    dispatch(increaseAmount(data));
    await updateCartItemAPI({
      ...data,
      quantity: data?.quantity + 1,
    });
  };
  const handleDecrease = async () => {
    if (data?.quantity > 1) {
      dispatch(decreaseAmount(data));
      await updateCartItemAPI({
        ...data,
        quantity: data?.quantity - 1,
      });
    } else {
      showDeleteConfirm(data?._id);
    }
  };
  const deleteItem = async (id) => {
    const res = await deleteCartItemAPI(id, user?.access_token);
    if (res.status === "OK") {
      dispatch(deleteCartItem(id));
    }
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteItem(id);
      },
    });
  };
  return (
    <div className="w-full py-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 first:rounded-t-[2rem] relative">
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full rounded-lg object-contain"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center w-[75%]">
        <p className="text-base text-gray-50 font-bold">{product?.name}</p>
        <p className="text-sm block text-gray-50 font-semibold">
          {convertPrice(price * quantity)}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto  text-gray-50">
        <div className=" active:scale-75 cursor-pointer">
          <BiMinus onClick={handleDecrease} />
        </div>
        <p className="w-5 h-5 rounded-md border flex items-center justify-center">
          {quantity}
        </p>
        <div className="cursor-pointer active:scale-75">
          <BiPlus onClick={handleIncrease} />
        </div>
      </div>
      <div className="cursor-pointer top-1 right-1 active:scale-75 absolute text-gray-200">
        <AiOutlineClose onClick={() => showDeleteConfirm(data?._id)} />
      </div>
    </div>
  );
}
