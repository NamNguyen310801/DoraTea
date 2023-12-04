import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { ChartCategory, NewProduct, ProductList } from "../AdminProduct";
import Category from "../AdminCategory";
import { NewUser, UserChart, UserList } from "../AdminUser";
import AdminHome from "../AdminHome/AdminHome";
import { OrderList, NewOrder, OrderChart } from "../AdminOrder";
export default function AdminContent() {
  return (
    <Content className="">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/statsProduct" element={<ChartCategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/statsUser" element={<UserChart />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/newOrder" element={<NewOrder />} />
        <Route path="/statsOrder" element={<OrderChart />} />
      </Routes>
    </Content>
  );
}
