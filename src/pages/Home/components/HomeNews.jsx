import React from "react";
import { homeLine } from "../../../assets";

export default function HomeNews() {
  return (
    <section className="text-gray-600 body-font pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center pt-16">
          <div className="text-center text-[36px] uppercase mb-0 px-[50px] font-bold text-headingColor">
            KHÁM PHÁ DORATEA NHẬN NGAY KHUYẾN MÃI
          </div>
          <div
            className="w-[315px] h-[30px]"
            style={{
              backgroundImage: `url(${homeLine})`,
            }}></div>
        </div>
      </div>
      <div className="flex justify-center container mx-auto">
        <div className="w-1/2 mr-2 flex flex-wrap">
          {/* new items */}
          <a
            className="group hover:shadow-newShadow first:w-full hover:text-black odd:ml-2 even:mr-2 bg-[#f5f5f5] cursor-pointer overflow-hidden mb-[30px] transition-all duration-200 sha"
            href="https://tocotocotea.com/tin-tuc-mobile/cap-ben-toco-nguoi-ban-khong-lo-dung-luong-1-lit-khien-gioi-tre-ban-loan/">
            <div className="overflow-hidden">
              <img
                className="group-hover:scale-110 w-full transition-all duration-200"
                src="https://tocotocotea.com/wp-content/uploads/2023/07/8f2e637005a4d6fa8fb5.jpg"
                alt=""
              />
            </div>
            <div className="p-[15px]">
              <div className="uppercase mb-[5px] text-[#282828] font-semibold">
                Cập bến Dora Người bạn khổng lồ dung lượng 1 lít khiến giới trẻ
                bấn loạn
              </div>
              <div className="group-first:block mt-8">
                Dora Người bạn khổng lồ size XL “siêu to siêu khổng lồ” có thể
                làm hài lòng tất cả bạn trẻ với hương vị Trà Hibicus Chanh Vàng
                chua chua […]
              </div>
              <div className="group-first:inline-block px-4 py-1 text-base mt-4 border border-[#d3b673] text-white bg-[#d3b673] uppercase">
                Xem thêm
              </div>
            </div>
          </a>
          <a
            className="group hover:shadow-newShadow first:w-full hover:text-black odd:ml-2 even:mr-2 bg-[#f5f5f5] cursor-pointer overflow-hidden mb-[30px] transition-all duration-200 sha"
            href="https://tocotocotea.com/tin-tuc-mobile/cap-ben-toco-nguoi-ban-khong-lo-dung-luong-1-lit-khien-gioi-tre-ban-loan/">
            <div className="overflow-hidden">
              <img
                className="group-hover:scale-110 w-full transition-all duration-200"
                src="https://tocotocotea.com/wp-content/uploads/2023/07/8f2e637005a4d6fa8fb5.jpg"
                alt=""
              />
            </div>
            <div className="p-[15px]">
              <div className="uppercase mb-[5px] text-[#282828] font-semibold">
                Cập bến Dora Người bạn khổng lồ dung lượng 1 lít khiến giới trẻ
                bấn loạn
              </div>
              <div className="group-first:block mt-8">
                Dora Người bạn khổng lồ size XL “siêu to siêu khổng lồ” có thể
                làm hài lòng tất cả bạn trẻ với hương vị Trà Hibicus Chanh Vàng
                chua chua […]
              </div>
              <div className="group-first:inline-block px-4 py-1 text-base mt-4 border border-[#d3b673] text-white bg-[#d3b673] uppercase">
                Xem thêm
              </div>
            </div>
          </a>
        </div>
        <div className="w-1/2 ml-2">
          <div className="">
            {/* main vide */}
            <div className="mb-[30px] relative">
              <div className="relative flex items-center justify-center overflow-hidden">
                <i
                  className="far fa-play-circle home-btn-play"
                  link="https://www.youtube.com/embed/8eHi2B2tQBs"
                  aria-hidden="true"
                />
                <img
                  src="https://tocotocotea.com/wp-content/uploads/2021/07/video_bg.png"
                  alt=""
                />
              </div>
              <div className="break-keep text-base text-center font-bold pl-4 text-[#282828]">
                CON ĐƯỜNG KHỞI NGHIỆP CỦA NGƯỜI SÁNG LẬP THƯƠNG HIỆU TRÀ SỮA
                VIỆT NAM - Dora
              </div>
            </div>
            {/* item */}
            <div className="mb-[30px] flex flex-col md:flex-row items-center">
              <div className="min-w-[160px] max-w-[160px]">
                <i
                  className="far fa-play-circle home-btn-play"
                  link="https://www.youtube.com/embed/63jXIH-MmLw"
                  aria-hidden="true"
                />
                <img
                  src="https://tocotocotea.com/wp-content/uploads/2021/07/TACO_THƯƠNG-HIỆU-TIÊU-BIỂU-CHÂU-Á-THÁI-BÌNH-DƯƠNG-2021.jpg"
                  alt=""
                />
              </div>
              <div className="break-keep text-base text-center font-bold pl-4 text-[#282828]">
                Dora đạt top 10 thương hiệu Châu Á Thái Bình Dương 2021
              </div>
            </div>
            <div className="mb-[30px] flex md:flex-row items-center">
              <div className="min-w-[160px] max-w-[160px]">
                <i
                  className="far fa-play-circle home-btn-play"
                  link="https://www.youtube.com/embed/z5qGFD1_YGA"
                  aria-hidden="true"
                />
                <img
                  src="https://tocotocotea.com/wp-content/uploads/2021/08/Clip_NML_cửa-hàng_B-C.jpg"
                  alt=""
                />
              </div>
              <div className="absolute bottom-1 text-lg text-center font-bold px-2 text-white">
                Dora thay đổi quan niệm về nguyên liệu cho ngành trà sữa Việt
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
