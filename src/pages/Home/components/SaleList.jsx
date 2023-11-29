import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { SaleBG, SaleTh } from "../../../assets";
import { ButtonViewAll, Skeleton } from "../../../components";
import { getDiscountProduct } from "../../../service/product.api";
import { setDiscountList } from "../../../redux/slice/product.slice";
import { setLoadingSale } from "../../../redux/slice/loading.slice";

export default function SaleList() {
  const dispatch = useDispatch();
  const discountList = useSelector((state) => state.product.discountList);
  const loadingSale = useSelector((state) => state.loading.loadingSale);

  useEffect(() => {
    if (!discountList) {
      getDiscountList();
    }
  }, []);
  const getDiscountList = async () => {
    dispatch(setLoadingSale(true));
    const res = await getDiscountProduct();
    if (res.status === "OK") {
      dispatch(setDiscountList(res.data));
    }
    dispatch(setLoadingSale(false));
  };
  return (
    <section
      className="py-8 w-full relative bg-cover bg-no-repeat bg-center  "
      style={{ backgroundImage: `url(${SaleBG})` }}>
      <div className="container mx-auto z-[1]">
        <div className="flex items-center justify-center ">
          <div className="text-center text-[28px] md:text-[36px] relative uppercase mb-0 px-[50px] font-bold text-headingColor ">
            Đang Khuyến Mãi
            <img
              src={SaleTh}
              alt=""
              className="w-16 absolute -top-1 -right-3 animate-miniScale"
            />
          </div>
        </div>
        <div className="container flex flex-col justify-center mx-auto ">
          <div className="flex flex-wrap mt-12 gap-4">
            {loadingSale && (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
            {discountList?.length > 8
              ? discountList
                  ?.slice(0, 8)
                  ?.map((data) => <ProductCard data={data} key={data?._id} />)
              : discountList?.map((data) => (
                  <ProductCard data={data} key={data?._id} />
                ))}
          </div>
        </div>
        <ButtonViewAll />
      </div>
    </section>
  );
}
