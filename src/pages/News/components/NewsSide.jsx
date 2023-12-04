import React from "react";
import { NavLink } from "react-router-dom";

export default function NewsSide() {
  return (
    <div className="w-[30%] xl:w-1/5 h-full">
      <div className="w-full">
        <div className="text-[24px] uppercase text-[#d3a673] mb-8 font-bold">
          Danh mục tin tức
        </div>
        <nav className="flex items-center justify-start gap-3 sm:ml-auto md:gap-6 lg:gap-8 ">
          <ul className="hidden sm:flex flex-col items-start justify-center gap-1">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-base font-extrabold uppercase text-[#a5858f] mb-2 h-9 border-b-2 border-[#282828] "
                  : "text-base font-extrabold uppercase text-[#282828] mb-2 h-9"
              }
              to={"cau-chuyen-thuong-hieu"}>
              Câu chuyện thương hiệu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-base font-extrabold uppercase text-[#a5858f] mb-2 h-9 border-b-2  border-[#282828]"
                  : "text-base font-extrabold uppercase text-[#282828] mb-2 h-9"
              }
              to={"tin-tuc-khuyen-mai"}>
              Tin tức khuyến mại
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-base font-extrabold uppercase text-[#a5858f] mb-2 h-9 border-b-2 border-[#282828]"
                  : "text-base font-extrabold uppercase text-[#282828] mb-2 h-9"
              }
              to={"su-kien"}>
              Sự kiện
            </NavLink>
          </ul>
        </nav>
      </div>
      <div className=""></div>
    </div>
  );
}
