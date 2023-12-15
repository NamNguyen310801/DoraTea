import React, { useEffect } from "react";
import { Slider } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  setDiscountList,
  setPopularList,
} from "../../../redux/slice/product.slice";
import {
  getDiscountProduct,
  getPopularProduct,
} from "../../../service/product.api";

export default function MenuSlider() {
  const dispatch = useDispatch();
  const popularList = useSelector((state) => state.product.popularList);
  const discountList = useSelector((state) => state.product.discountList);
  const textSearch = useSelector((state) => state.loading.textSearch);

  useEffect(() => {
    if (!popularList) {
      getPopularList();
    }
  }, []);
  useEffect(() => {
    if (!discountList) {
      getDiscountList();
    }
  }, []);

  const getPopularList = async () => {
    const popPro = await getPopularProduct();
    if (popPro.status === "OK") {
      dispatch(setPopularList(popPro.data));
    }
  };

  const getDiscountList = async () => {
    const res = await getDiscountProduct();
    if (res.status === "OK") {
      dispatch(setDiscountList(res.data));
    }
  };
  return (
    <section className="w-full pb-4 flex flex-col">
      <div className="w-full flex items-start justify-start flex-col ">
        <div className="w-full flex items-center justify-between">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex flex-col items-start justify-start gap-1">
            <h2 className="text-xl text-headingColor font-bold" id="Trà sữa">
              Những sản phẩm phổ biến
            </h2>
            <div className="h-1 w-40 rounded-md bg-orange-500"></div>
          </div>
        </div>
        <Slider
          productList={
            textSearch
              ? popularList?.filter((item) =>
                  item?.name?.toLowerCase()?.includes(textSearch?.toLowerCase())
                )
              : popularList
          }
        />
      </div>
      <div className="w-full flex items-start justify-start flex-col ">
        <div className="w-full flex items-center justify-between">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex flex-col items-start justify-start gap-1">
            <h2 className="text-xl text-headingColor font-bold" id="Trà sữa">
              Những sảm phẩm đang khuyến mãi
            </h2>
            <div className="h-1 w-40 rounded-md bg-orange-500"></div>
          </div>
        </div>
        <Slider
          productList={
            textSearch
              ? discountList?.filter((item) =>
                  item?.name?.toLowerCase()?.includes(textSearch?.toLowerCase())
                )
              : discountList
          }
        />
      </div>
    </section>
  );
}
