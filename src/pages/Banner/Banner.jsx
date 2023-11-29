import React from "react";
import { Carousel } from "flowbite-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerCard from "../../components/BannerCard";
export default function Banner() {
  const url = [
    {
      url: "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1690915611188-2d6e2fc30c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1347&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1682686581413-0a0ec9bb35bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  return (
    <div className="h-64 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={4000} className=" relative">
        {url.map((url, index) => (
          <BannerCard url={url.url} key={index} title="" />
        ))}
      </Carousel>
    </div>
  );
}
