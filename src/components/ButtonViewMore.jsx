import React from "react";

export default function ButtonViewMore({ text = "Xem tất cả" }) {
  return (
    <div className="border border-[#d3b673] text-white bg-[#d3b673] inline-block uppercase text-base cursor-pointer py-[2px] px-4 mb-3 rounded hover:bg-transparent hover:text-[#d3b673]">
      {text}
    </div>
  );
}
