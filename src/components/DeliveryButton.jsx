import React from "react";
import { Link } from "react-router-dom";
import { Delivery } from "../assets";
import "../assets/css/animation.css";
export default function DeliveryButton() {
  return (
    <Link
      to={"/menu"}
      className="btn-delivery fixed right-[25px] bottom-[35px] md:right-[35px] md:bottom-[45px] w-16 h-16 rounded-full overflow-hidden z-[2]">
      <img src={Delivery} alt="" className="w-full h-full object-contain" />
    </Link>
  );
}
