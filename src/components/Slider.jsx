import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/swiper.css";
import { Pagination } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import SliderCard from "./SliderCard";

export default function Slider({ productList = [] }) {
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1536) {
        setPerView(4);
      } else if (window.innerWidth > 1280) {
        setPerView(3);
      } else if (window.innerWidth > 768) {
        setPerView(2);
      } else {
        setPerView(1);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        console.log(window.innerWidth);
      });
    };
  }, []);
  return (
    <div className="w-full pt-8 md:pt-10">
      <Swiper
        slidesPerView={perView}
        centeredSlides={false}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        modules={[Pagination]}
        className="mySwiper">
        {productList?.map((data, index) => (
          <SwiperSlide key={index} className="p-1">
            <SliderCard key={index} data={data} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
