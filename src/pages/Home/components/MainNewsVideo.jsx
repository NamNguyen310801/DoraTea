export default function MainNewsVideo({ item = null }) {
  return (
    <div className="mb-[30px] relative cursor-pointer">
      <div className="relative flex items-center justify-center overflow-hidden rounded-md">
        <i
          className="far fa-play-circle home-btn-play"
          link="https://www.youtube.com/embed/8eHi2B2tQBs"
          aria-hidden="true"
        />
        <img
          className="w-full bg-center bg-contain hover:scale-105 transition-all duration-300"
          src={
            item?.image ||
            "https://tocotocotea.com/wp-content/uploads/2021/07/video_bg.png"
          }
          alt=""
        />
      </div>
      <div className="absolute bottom-1 break-keep text-lg text-center font-extrabold pl-4 text-white">
        {item?.title ||
          "CON ĐƯỜNG KHỞI NGHIỆP CỦA NGƯỜI SÁNG LẬP THƯƠNG HIỆU TRÀ SỮA VIỆT NAM - DORA"}
      </div>
    </div>
  );
}
