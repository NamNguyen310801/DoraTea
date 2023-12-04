export default function VideosNewItems({ item }) {
  return (
    <div className="mb-[30px] flex flex-col md:flex-row items-center cursor-pointer">
      <div className="min-w-[160px] max-w-[160px] rounded-sm overflow-hidden">
        <i
          className="far fa-play-circle home-btn-play"
          link="https://www.youtube.com/embed/63jXIH-MmLw"
          aria-hidden="true"
        />
        <img
          src={
            item?.image ||
            "https://tocotocotea.com/wp-content/uploads/2021/07/TACO_THƯƠNG-HIỆU-TIÊU-BIỂU-CHÂU-Á-THÁI-BÌNH-DƯƠNG-2021.jpg"
          }
          alt=""
          className="w-full bg-center bg-cover hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="break-keep text-base text-center font-bold pl-4 text-[#282828]">
        {item?.title ||
          "Dora đạt top 10 thương hiệu Châu Á Thái Bình Dương 2021"}
      </div>
    </div>
  );
}
