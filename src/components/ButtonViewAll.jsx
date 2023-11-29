import React from "react";
import { Link } from "react-router-dom";

export default function ButtonViewAll() {
  return (
    <div className="w-full text-center">
      <Link to={"/menu"}>
        <div className="border border-[#d3b673] text-white bg-[#d3b673] inline-block uppercase text-base cursor-pointer py-[2px] px-4 mb-3 rounded hover:bg-white hover:text-[#d3b673]">
          Xem tất cả
        </div>
      </Link>
    </div>
  );
}
