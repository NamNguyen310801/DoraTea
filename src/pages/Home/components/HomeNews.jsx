import React from "react";
import { homeLine } from "../../../assets";
import NewsItems from "./NewsItems";
import VideosNewItems from "./VideosNewItems";
import MainNewsVideo from "./MainNewsVideo";

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
      <div className="flex justify-center container mx-auto gap-x-4">
        <div className="w-1/2  flex flex-wrap mt-2">
          {/* new items */}
          <NewsItems />
          <NewsItems />
          <NewsItems />
        </div>
        <div className="w-1/2">
          <div className="flex flex-col w-full mt-2">
            {/* main vide */}
            <MainNewsVideo />
            {/* item */}
            <VideosNewItems />
            <VideosNewItems />
          </div>
        </div>
      </div>
    </section>
  );
}
