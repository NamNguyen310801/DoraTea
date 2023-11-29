import React from "react";
import "../assets/css/Loader.css";
export default function LoadingMain() {
  return (
    <div className="flex items-center justify-center section-loader w-full">
      <div className="loader w-[40px] h-[40px] relative">
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ "--i": i + 1 }}></span>
        ))}
      </div>
    </div>
  );
}
