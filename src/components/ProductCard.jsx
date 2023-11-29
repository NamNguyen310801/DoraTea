import React from "react";
import { useDispatch } from "react-redux";
import { setDataDetail, setShowDetail } from "../redux/slice/product.slice";
import { convertPrice } from "../utils/function";

export default function ProductCard({ data = null, isNew = false }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setShowDetail(true));
    dispatch(setDataDetail(data));
  };

  return (
    <div
      className="group md:w-[calc(25%-42px)] w-[calc(50%-38px)] rounded mx-[15px] mb-[32px] shadow-card relative overflow-hidden cursor-pointer bg-cardOverlay shadow-[#ccc]"
      product-id={data?._id}>
      <div
        className={`${
          isNew ? "justify-between" : "justify-end"
        } flex w-full absolute p-4 top-0  z-[1] items-center`}>
        {isNew && (
          <div className="bg-[#d3b673] font-bold rotate-[-15deg] rounded-full text-white w-10 h-10 flex justify-center items-center">
            new
          </div>
        )}
        {Boolean(data?.discount) && (
          <div className="bg-[#282828] rounded-full text-[#d3b673] w-10 h-10 flex items-center justify-center">
            -{data?.discount}%
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded ">
        <img
          className="h-44 rounded w-full object-contain object-center group-hover:scale-110 transition-all duration-[0.2s] "
          src={data?.image}
          alt={data?.name}
        />
      </div>
      <div className="bg-[f5f5f5] transition-all duration-[0.2s] flex flex-col items-center relative top-[42px] group-hover:top-0">
        <div className="w-full text-base font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis px-2 pt-2">
          {data?.name}
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="text-[#8a733f] font-bold text-center ">
            {convertPrice(
              Boolean(data?.discount)
                ? Math.round(
                    (data?.price - data?.price * data?.discount * 0.01) / 1000
                  ) * 1000
                : data?.price
            )}
          </div>
          {Boolean(data?.discount) && (
            <div className="text-gray-400 line-through ml-2 scale-90 font-bold text-center">
              {data?.price}đ
            </div>
          )}
        </div>
        <div
          onClick={handleClick}
          className="border border-[#d3b673] text-white bg-[#d3b673] inline-block uppercase text-base cursor-pointer py-[2px] px-4 mt-4 mb-3 rounded hover:bg-transparent hover:text-[#d3b673]">
          Đặt Hàng
        </div>
      </div>
    </div>
  );
}
