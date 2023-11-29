import React from "react";
import { BsMouse } from "react-icons/bs";
import {
  Delivery2,
  Hero1,
  Hero2,
  Hero3,
  Hero4,
  Hero5,
  Hero6,
  Hero7,
  Hero8,
  Hero9,
  Hero10,
  Hero11,
} from "../../assets";
import "../../assets/css/animation.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "../../assets/css/swiper.css";
import { Autoplay, EffectCards } from "swiper/modules";
export default function Hero() {
  const heroList = [
    Hero1,
    Hero2,
    Hero3,
    Hero4,
    Hero5,
    Hero6,
    Hero7,
    Hero8,
    Hero9,
    Hero10,
    Hero11,
  ];
  return (
    <section className="text-gray-600 body-font lg:h-[calc(100vh-94px)]">
      <div className="container mx-auto flex md:px-5 md:pb-24 md:flex-row flex-col items-center ">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-10 md:mb-0 items-center text-center gap-6 ">
          <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
            <div className="animate-wiggle w-10 h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-primary shadow-md overflow-hidden">
              <img
                src={Delivery2}
                alt="Vận chuyển thần tốc"
                className="w-full h-full object-contain"
              />
            </div>
            <p className=" text-lg font-semibold text-orange-500 xl:text-xl">
              Vận chuyển thần tốc
            </p>
          </div>
          <p className="text-[38px] text-headingColor text-left md:text-[48px] lg:text-[60px] xl:text-[66px] 2xl:text-[72px] font-sans font-extrabold tracking-wider 2xl:max-w-[768px]">
            Gửi hương vị <span className="text-orange-600">ngon nhất</span> đến
            bạn
          </p>
          <p className="mb-8 leading-relaxed text-base md:text-lg text-textColor text-justify 2xl:max-w-[768px]">
            Bên cạnh niềm tự hào về những ly trà sữa ngon – sạch – tươi, chúng
            tôi luôn tự tin mang đến khách hàng những trải nghiệm tốt nhất về
            dịch vụ và không gian.
          </p>

          <Link
            to={"/menu"}
            className="animate-miniScale bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 xl:px-6 xl:py-3 hover:from-orange-500 hover:to-orange-700 rounded-xl text-white text-sm md:text-base font-semibold active:scale-95">
            Mua ngay
          </Link>
        </div>
        <div className="lg:max-w-lg xl:w-full md:w-[45%] w-5/6 flex justify-center items-center overflow-hidden md:overflow-visible">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            grabCursor={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            effect={"cards"}
            modules={[Autoplay, EffectCards]}
            className="mySwiper ">
            {heroList?.map((data, index) => (
              <SwiperSlide key={index} className="p-1">
                <img
                  key={index}
                  className="object-cover object-center rounded w-full max-h-[680px]"
                  alt="hero"
                  src={data}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="-mt-20 flex-col hidden md:flex justify-center items-center">
        <div className=" animate-bounce">
          <BsMouse className="text-[40px]" />
        </div>
        <div className="text-base text-gray-800">
          Cuộn xuống để khám phá thêm
        </div>
      </div>
    </section>
  );
}
