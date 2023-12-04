import { Route, Routes } from "react-router-dom";
import NewsStory from "./NewsStory";
import NewsDiscount from "./NewsDiscount";
import NewsEvent from "./NewsEvent";

export default function NewsMain() {
  return (
    <div className="w-[70%] xl:w-[80%] pl-8">
      <Routes>
        <Route path="/" element={<NewsStory />} />
        <Route path="/cau-chuyen-thuong-hieu" element={<NewsStory />} />
        <Route path="/tin-tuc-khuyen-mai" element={<NewsDiscount />} />
        <Route path="/su-kien" element={<NewsEvent />} />
      </Routes>
    </div>
  );
}
