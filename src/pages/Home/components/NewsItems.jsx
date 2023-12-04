import { Link, useNavigate } from "react-router-dom";
import { ButtonViewMore } from "../../../components";

export default function NewsItems({ item = null }) {
  return (
    <Link
      className="group hover:shadow-newShadow first:w-full hover:text-black odd:ml-2 even:mr-2 bg-[#f5f5f5] cursor-pointer overflow-hidden mb-[30px] transition-all duration-200 shadow-md w-[calc(50%-8px)]"
      to={
        item?.url ||
        "https://tocotocotea.com/tin-tuc-mobile/cap-ben-toco-nguoi-ban-khong-lo-dung-luong-1-lit-khien-gioi-tre-ban-loan/"
      }>
      <div className="overflow-hidden rounded-md">
        <img
          className="group-hover:scale-110 w-full transition-all duration-200 bg-center bg-cover"
          src={
            item?.image ||
            "https://tocotocotea.com/wp-content/uploads/2023/07/8f2e637005a4d6fa8fb5.jpg"
          }
          alt=""
        />
      </div>
      <div className="p-[15px]">
        <div className="uppercase mb-[5px] text-[#282828] font-semibold">
          {item?.title ||
            " Cập bến Dora Người bạn khổng lồ dung lượng 1 lít khiến giới trẻ bấn loạn"}
        </div>
        <div className="group-first:block mt-4">
          {item?.description ||
            "Dora Người bạn khổng lồ size XL “siêu to siêu khổng lồ” có thể làm hài lòng tất cả bạn trẻ với hương vị Trà Hibicus Chanh Vàng chua chua […]"}
        </div>
        <div className="w-auto max-w-[113px] flex items-center mt-2">
          <ButtonViewMore text="Xem thêm" />
        </div>
      </div>
    </Link>
  );
}
