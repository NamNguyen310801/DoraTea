import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import UserOrder from "./UserOrder";
import OrderDetail from "./OrderDetail";

export default function UserRight() {
  return (
    <div className="relative w-[1080px] ml-7 overflow-y-scroll scrollbar-none">
      <Routes>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/orders/*" element={<UserOrder />} />
        <Route path="/orders-detail/:id" element={<OrderDetail />} />
      </Routes>
    </div>
  );
}
