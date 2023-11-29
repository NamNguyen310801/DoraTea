import React, { useEffect } from "react";
import { MenuHeader, MenuSlider, MenuTitle } from "./components";
import MenuCategory from "./components/MenuCategory";
import { getAllProduct } from "../../service/product.api";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../../redux/slice/product.slice";
import Cart from "../Cart/Cart";
function Menu() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const cartList = useSelector((state) => state.cart.cartList);

  useEffect(() => {
    if (!productList) {
      handleGetAllProduct();
    }
  }, []);

  const handleGetAllProduct = async () => {
    const res = await getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    }
  };
  return (
    <div className="flex flex-col bg-neutral-100 w-screen overflow-hidden">
      <MenuHeader />
      <main className="container mx-auto  bg-slate-100 mt-[87px] min-h-[calc(100vh-94px)] px-2 md:px-0">
        <MenuTitle />
        <MenuSlider />
        <MenuTitle title="Danh sách theo thể loại" />
        <MenuCategory />
        <Cart />
      </main>
    </div>
  );
}

export default Menu;
