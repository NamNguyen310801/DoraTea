import React from "react";
import { BsPencil } from "react-icons/bs";

export default function ButtonEdit(props) {
  const { onClick } = props;
  return (
    <div
      className="cursor-pointer text-xl w-8 h-8 rounded-full flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white active:scale-95"
      onClick={onClick}>
      <BsPencil />
    </div>
  );
}
