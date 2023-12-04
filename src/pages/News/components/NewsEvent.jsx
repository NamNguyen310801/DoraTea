import { PostCard } from "../../../components";

export default function NewsEvent() {
  return (
    <div className="w-full">
      <div className="text-[24px] uppercase text-[#282828] mb-8 font-bold">
        Sự kiện
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
