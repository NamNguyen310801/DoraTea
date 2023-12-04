import { Link } from "react-router-dom";
import ButtonViewMore from "./ButtonViewMore";

export default function PostCard({ post = null }) {
  return (
    <Link
      className="basis-1/2 max-w-[calc(50%-8px)] w-[calc(50%-8px)] bg-[#f5f5f5] mb-10 transition-all duration-300 cursor-pointer flex flex-col"
      to={
        post?.url ||
        "https://tocotocotea.com/blogs/tra-chanh-mat-ong-gia-tay-sieu-pham-cuc-hot-cua-tocotoco-chinh-thuc-chao-san/"
      }>
      <div className="w-full bg-center bg-cover overflow-hidden">
        <img
          className="w-full bg-center bg-cover hover:scale-110 transition-all duration-300"
          src={
            post?.image ||
            "https://tocotocotea.com/wp-content/uploads/2023/12/tra-chanh-gia-tay.jpg"
          }
          alt=""
        />
      </div>
      <div className="px-4 pt-4 pb-6 text-sm lg:text-base">
        <div className="text-[#333333] mb-2 h-12 font-bold line-clamp-2">
          {post?.title ||
            "Trà chanh mật ong giã tay: “siêu phẩm” cực hot của ToCoToCo chính thức chào sân"}
        </div>
        <div className="font-normal mb-4 text-[#4d4d4d] text-justify line-clamp-3">
          {post?.description ||
            "Chắc chắn tháng 12 thị trường F&amp;B sẽ chứng kiến sự bùng nổ của một trào lưu mới mang tên Trà Chanh Mật Ong Giã Tay ToCoToCo “chất lượng cao” […]"}
        </div>
        <ButtonViewMore text="Xem thêm" />
      </div>
    </Link>
  );
}
