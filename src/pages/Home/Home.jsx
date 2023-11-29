import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import DeliveryButton from "../../components/DeliveryButton";
import { HomeNews, PopularList } from "./components";
import SaleList from "./components/SaleList";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetail } from "../../components";
import { setShowDetail } from "../../redux/slice/product.slice";

export default function Home() {
  const dispatch = useDispatch();
  const dataDetail = useSelector((state) => state.product.dataDetail);

  const handleOnClose = () => {
    dispatch(setShowDetail(false));
  };
  return (
    <>
      <Header />
      <main className="container relative mx-auto pt-16 bg-slate-100 mt-10 min-h-[calc(100vh)] px-2 md:px-0">
        <Hero />
        <PopularList />
        <SaleList />
        <HomeNews />
        <Cart />
      </main>
      <Footer />
      <ProductDetail data={dataDetail} onClose={handleOnClose} />
      <DeliveryButton />
    </>
  );
}
