import React, { useState } from "react";
import { Button, Menu, Space } from "antd";
import {
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineViewGridAdd,
  HiOutlineColorSwatch,
  HiViewList,
  HiOutlineUserGroup,
  HiOutlineDocumentAdd,
  HiOutlineClipboardList,
} from "react-icons/hi";
import {
  ContainerOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getItem } from "../../../utils/function";
import Sider from "antd/es/layout/Sider";
import { NavLink, useNavigate } from "react-router-dom";
import "./adminPage.css";
import { Logo } from "../../../assets";
const items = [
  getItem(
    "Home",
    "home",
    <HomeOutlined className="md:text-xl font-semibold" />
  ),
  getItem(
    "Người dùng",
    "user",
    <UserOutlined className="md:text-xl font-semibold" />,
    [
      getItem(
        "Danh sách",
        "userList",
        <TeamOutlined className="md:text-lg font-semibold" />
      ),
      getItem(
        "Thêm người dùng",
        "newUser",
        <UserAddOutlined className="md:text-lg font-semibold" />
      ),
      getItem(
        "Thống kê",
        "statsUser",
        <HiOutlineUserGroup className="md:text-lg font-semibold" />
      ),
    ]
  ),
  getItem(
    "Sản phẩm",
    "productAdmin",
    <HiOutlineCube className="md:text-xl font-semibold" />,
    [
      getItem(
        "Danh sách",
        "product",
        <HiOutlineDocumentText className="md:text-xl font-semibold" />
      ),
      getItem(
        "Thêm sản phẩm",
        "newProduct",
        <HiOutlineViewGridAdd className="md:text-xl font-semibold" />
      ),
      getItem(
        "Thống kê",
        "statsProduct",
        <HiViewList className="md:text-xl font-semibold" />
      ),
    ]
  ),
  getItem(
    "Thể loại",
    "category",
    <HiOutlineColorSwatch className="text-xl font-semibold" />
  ),
  getItem(
    "Đơn hàng",
    "orderAdmin",
    <ContainerOutlined className="md:text-xl font-semibold" />,
    [
      getItem(
        "Danh sách",
        "order",
        <HiOutlineClipboardList className="md:text-xl font-semibold" />
      ),
      // getItem(
      //   "Thêm đơn hàng",
      //   "newOrder",
      //   <HiOutlineDocumentAdd className="md:text-xl font-semibold" />
      // ),
      getItem(
        "Thống kê đơn hàng",
        "statsOrder",
        <HiViewList className="md:text-xl font-semibold" />
      ),
    ]
  ),
];
export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const handleClick = ({ key }) => {
    navigate(key);
  };
  return (
    <Sider
      className="adminPage bg-lightOverlay "
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <Space className="flex items-center justify-between mx-4 pt-2 border-b border-gray-200 h-16">
        {!collapsed && (
          <NavLink
            to={"/"}
            className="active:scale-95 hover:no-underline flex items-center gap-2 justify-start sm:min-w-[120px]">
            <img src={Logo} alt="Logo" width={48} />
            <p className="text-xl font-semibold">DoraTea</p>
          </NavLink>
        )}
        <Button
          onClick={toggleCollapsed}
          style={{
            display: "block",
            border: "none",
            cursor: "pointer",
          }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Space>
      <Menu
        className="text-base font-semibold text-headingColor"
        onClick={handleClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </Sider>
  );
}
