import React from "react";
import ProductCard from "../../../components/ProductCard";
import { useSelector } from "react-redux";

export default function SaleList() {
  const discountList = useSelector((state) => state.product.discountList);

  return (
    <section className="container flex flex-col justify-center mx-auto 2xl:max-w-[1280px]">
      <div className="flex flex-wrap mt-12 gap-4">
        {discountList?.map((data) => (
          <ProductCard data={data} key={data?._id} />
        ))}
      </div>
    </section>
  );
}
