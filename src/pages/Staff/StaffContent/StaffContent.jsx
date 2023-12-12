import { Route, Routes } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { StaffProduct, StaffNewProduct } from "../StaffProduct";
import StaffCategory from "../StaffCategory";
import StaffHome from "../StaffHome/StaffHome";
import { StaffOrder } from "../StaffOrder";
export default function StaffContent() {
  return (
    <Content className="">
      <Routes>
        <Route path="/" element={<StaffHome />} />
        <Route path="/home" element={<StaffHome />} />
        <Route path="/product" element={<StaffProduct />} />
        <Route path="/newProduct" element={<StaffNewProduct />} />
        <Route path="/category" element={<StaffCategory />} />
        <Route path="/order" element={<StaffOrder />} />
      </Routes>
    </Content>
  );
}
