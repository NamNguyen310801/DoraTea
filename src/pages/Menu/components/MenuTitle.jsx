import React from "react";
import { Menu, homeLine } from "../../../assets";

export default function MenuTitle({ title = "" }) {
  return (
    <div className="flex flex-col items-center pt-4">
      {!title ? (
        <h1 className="text-center text-[36px] uppercase mb-0 px-[50px] font-bold text-blue-500 flex gap-x-2 items-center justify-center">
          DoraTea Menu
          <img src={Menu} alt="Menu" className="w-14 object-contain" />
        </h1>
      ) : (
        <h2 className="text-center text-[24px] capitalize mb-0 px-[50px] font-bold text-blue-500 flex gap-x-2 items-center justify-center">
          {title}
        </h2>
      )}
      <div
        className="w-[315px] h-[30px]"
        style={{
          backgroundImage: `url(${homeLine})`,
        }}></div>
    </div>
  );
}
