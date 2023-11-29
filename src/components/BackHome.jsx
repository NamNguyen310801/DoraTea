import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";

export default function BackHome() {
  return (
    <NavLink
      to={"/"}
      className="active:scale-95 flex items-center gap-1 justify-center sm:min-w-[120px]">
      <img src={Logo} alt="Logo" className="w-12 xl:w-14" />
      <p className="text-xl xl:text-2xl text-blue-600 font-semibold ">
        DoraTea
      </p>
    </NavLink>
  );
}
