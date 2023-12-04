import { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SliderCard } from "../../../components";

export default function MenuCategory() {
  const categoryList = useSelector((state) => state.category.categoryList);
  const productList = useSelector((state) => state.product.productList);
  const textSearch = useSelector((state) => state.loading.textSearch);
  const [filter, setFilter] = useState("");
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   if (textSearch) {
  //     setData(productList?.filter((item) => item?.name?.includes(textSearch)));
  //   } else {
  //     setData(productList);
  //   }
  // }, [textSearch, productList]);

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll lg:scrollbar-none">
          {categoryList &&
            categoryList?.map((category, index) => (
              //   <a href={`#${category}`}>
              <div
                onClick={() => setFilter(category)}
                key={index}
                className={`${
                  filter === category ? "bg-red-500" : "bg-card"
                } group  w-24 min-w-[96px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out 
                hover:bg-blue-500 active:scale-75`}>
                <div
                  className={`${
                    filter === category ? "bg-card" : "bg-red-500"
                  } w-10 h-10 rounded-full  group-hover:bg-card flex items-center justify-center`}>
                  <IoFastFood
                    className={`${
                      filter === category ? "text-textColor" : "text-card"
                    }
                     group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`${
                    filter === category ? "text-white" : "text-textColor"
                  } text-sm w-full min-h-[40px] text-center group-hover:text-white font-semibold px-2 break-words`}>
                  {category}
                </p>
              </div>
              //   </a>
            ))}
        </div>
        <div className="w-full flex flex-col bg-lightOverlay gap-y-3 py-6">
          <h2 className="text-blue-500 text-xl mb-1 font-bold capitalize text-center border-b-[1px] w-full border-gray-400">
            {filter || "sản phẩm"} của DoraTea
          </h2>
          <div className="w-full flex items-center gap-x-4 gap-y-6 mb-12 scroll-smooth overflow-x-hidden flex-wrap">
            {filter
              ? productList
                  ?.filter((item) => item?.name?.includes(textSearch))
                  ?.filter((product) => product.category === filter)
                  ?.map((product, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%/3)-(32px/3))] xl:lg:w-[calc(25%-12px)] cursor-grab">
                      <SliderCard key={index} data={product} index={index} />
                    </div>
                  ))
              : productList
                  ?.filter((item) => item?.name?.includes(textSearch))
                  ?.map((product, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%/3)-(32px/3))] xl:lg:w-[calc(25%-12px)] cursor-grab">
                      <SliderCard key={index} data={product} index={index} />
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
}
