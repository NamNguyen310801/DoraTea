import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularList } from "../../../redux/slice/product.slice";
import { getPopularProduct } from "../../../service/product.api";
import { ButtonViewAll, PopularCard, Skeleton } from "../../../components";
import { homeLine } from "../../../assets";
import { setLoadingPopular } from "../../../redux/slice/loading.slice";

export default function PopularList() {
  const dispatch = useDispatch();
  const popularList = useSelector((state) => state.product.popularList);
  const loadingPopular = useSelector((state) => state.loading.loadingPopular);
  useEffect(() => {
    if (!popularList) {
      dispatch(setLoadingPopular(true));
      getPopularList();
    }
  }, []);
  const getPopularList = async () => {
    const res = await getPopularProduct();
    if (res.status === "OK") {
      dispatch(setPopularList(res.data));
    }
    dispatch(setLoadingPopular(false));
  };
  return (
    <section className="text-gray-600 body-font pb-12">
      <div className="flex flex-col items-center pt-16">
        <div className="text-center text-[28px] md:text-[36px] uppercase mb-0 px-[50px] font-bold text-headingColor">
          Sản phẩm nổi bật
        </div>
        <div
          className="w-[315px] h-[30px]"
          style={{
            backgroundImage: `url(${homeLine})`,
          }}></div>
      </div>
      <div className="flex flex-wrap pt-4 justify-between gap-4 md:py-12">
        {loadingPopular && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {popularList?.map((data) => (
          <PopularCard data={data} key={data?._id} />
        ))}
      </div>
      <ButtonViewAll />
    </section>
  );
}
