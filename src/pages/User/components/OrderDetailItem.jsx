import { useState } from "react";
import { Link } from "react-router-dom";
import { convertPrice } from "../../../utils/function";
import { useDispatch } from "react-redux";
import { setShowRateModal } from "../../../redux/slice/loading.slice";
import { setProductRate } from "../../../redux/slice/product.slice";

export default function OrderDetailItem({ item }) {
  const [showRate, setShowRate] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setShowRateModal(true));
    dispatch(setProductRate(item?.product));
  };
  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setShowRate(true)}
      onMouseLeave={() => setShowRate(false)}>
      <Link
        className="flex items-center text-base break-words pt-3 flex-nowrap text-[rgba(0,0,0,0.87)] relative"
        to={`/product/${item?.product?._id}`}>
        <div className="flex flex-1 flex-nowrap items-start pr-3 break-words ">
          <img
            className="w-20 h-20 flex-shrink-0 border object-contain rounded overflow-hidden bg-[rgb(225,225,225)]"
            src={item?.product?.image}
            alt={item?.product?.name}
          />
          <div className="min-w-0 pl-3 flex flex-1 flex-col items-start break-words">
            <div className="overflow-hidden text-ellipsis mb-[5px] text-lg/5 max-h-12 line-clamp-2">
              <span className="align-middle ">{item?.product?.name}</span>
            </div>
            <div>
              <div className="mb-[5px] text-[rgba(0,0,0,0.54)] ">
                Phân loại: {item?.product?.category}
              </div>
              <div className="mb-[5px]">x{item?.quantity}</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="ml-3">
            {Boolean(item?.product?.discount) && (
              <span className="mr-1 line-through text-black opacity-25 overflow-hidden text-ellipsis">
                {convertPrice(item?.product?.price * item?.quantity)}
              </span>
            )}

            <span className="text-[#ee4d2d] ">
              {convertPrice(
                Math.round(
                  (item?.product?.price -
                    item?.product?.price * item?.product?.discount * 0.01) /
                    1000
                ) *
                  1000 *
                  item?.quantity
              )}
            </span>
          </div>
        </div>
      </Link>
      {showRate && (
        <div className="w-[60px] z-[2] absolute top-3 cursor-default bottom-0 right-0 text-sm font-semibold text-gray-600 transition-all duration-300">
          <span onClick={handleClick} className="cursor-pointer">
            Đánh giá
          </span>
        </div>
      )}
    </div>
  );
}
