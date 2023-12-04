import { PostCard } from "../../../components";

export default function NewsDiscount() {
  return (
    <div className="w-full">
      <div className="text-[24px] uppercase text-[#282828] mb-8 font-bold">
        Tin tức khuyến mại
      </div>
      <div className="flex flex-wrap w-full gap-x-4 gap-y-3">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
