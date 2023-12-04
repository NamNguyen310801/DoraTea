import ProductCard from "../../../components/ProductCard";
import { useSelector } from "react-redux";

export default function SaleList() {
  const discountList = useSelector((state) => state.product.discountList);
  const textSearch = useSelector((state) => state.loading.textSearch);

  return (
    <section className="container flex flex-col justify-center mx-auto 2xl:max-w-[1280px]">
      <div className="flex flex-wrap mt-12 gap-4">
        {textSearch
          ? discountList
              ?.filter((data) => data?.name?.includes(textSearch))
              ?.map((data) => <ProductCard data={data} key={data?._id} />)
          : discountList?.map((data) => (
              <ProductCard data={data} key={data?._id} />
            ))}
      </div>
    </section>
  );
}
