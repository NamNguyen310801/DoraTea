import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoadingPopular } from "../../../../redux/slice/loading.slice";
import { getPopularProduct } from "../../../../service/product.api";
import { setPopularList } from "../../../../redux/slice/product.slice";
import { convertPrice } from "../../../../utils/function";

function PopularProducts() {
  const dispatch = useDispatch();
  const popularList = useSelector((state) => state.product.popularList);
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
  };
  return (
    <div className="w-[20%] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Sản phẩm phổ biến</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularList?.map((product) => (
          <Link
            key={product?._id}
            to={`/product/${product?._id}`}
            className="flex items-start hover:no-underline">
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product?.image}
                alt={product?.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product?.name}</p>
              <span className=" text-green-500 text-xs font-medium">
                {product?.category}
              </span>
            </div>
            <div className="text-sm text-gray-400 pl-1.5 flex flex-col">
              {convertPrice(
                Math.round(
                  (product?.price - product?.price * product?.discount * 0.01) /
                    1000
                ) * 1000
              )}
              <span className=" text-orange-500 text-xs font-medium">
                Đã bán: {product?.selled}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
