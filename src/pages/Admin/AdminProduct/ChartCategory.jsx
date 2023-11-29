import React, { useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import { useDispatch, useSelector } from "react-redux";
import * as CategoryService from "../../../service/category.api";
import {
  setAllCategory,
  setCategoryList,
  setHeadCategoryList,
} from "../../../redux/slice/category.slice";
import { getAllProduct } from "../../../service/product.api";
import { setProductList } from "../../../redux/slice/product.slice";

export default function ChartCategory() {
  const dispatch = useDispatch();
  const headCategoryList = useSelector(
    (state) => state.category.headCategoryList
  );
  const allCategory = useSelector((state) => state.category.allCategory);
  const categoryList = useSelector((state) => state.category.categoryList);
  const productList = useSelector((state) => state.product.productList);

  useEffect(() => {
    if (!headCategoryList || !categoryList || !allCategory) {
      handleGetCategory();
    }
  }, []);
  useEffect(() => {
    if (!productList) {
      handleGetAllProduct();
    }
  }, []);
  // get headCate,cate
  const handleGetCategory = async () => {
    const res = await CategoryService.getAllCategory();
    if (res.status === "OK") {
      dispatch(setAllCategory(res.data));

      const categoryList = [...new Set(res.data.map((ct) => ct.category))];
      const headCategoryList = [
        ...new Set(res.data.map((ct) => ct.headCategory)),
      ];
      dispatch(setCategoryList(categoryList));
      dispatch(setHeadCategoryList(headCategoryList));
    } else {
      console.log("ERR");
    }
  };
  // Lay danh sach san pham
  const handleGetAllProduct = async () => {
    const res = await getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      console.log(res.message);
    }
  };

  // Đếm số lượng sản phẩm cho mỗi category và thêm vào mảng productCountArray
  const productCountArray = categoryList?.map((category) => {
    return productList?.filter((product) => product.category === category)
      .length;
  });
  // Đếm số lượng sản phẩm cho mỗi category và thêm vào mảng headCategoryCountArray

  const headCategoryCountArray = headCategoryList?.map((headCategory) => {
    return allCategory?.filter(
      (category) => category.headCategory === headCategory
    ).length;
  });
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full rounded-sm border border-gray-200 h-full">
      <h1 className="text-xl font-bold text-center mb-3 mt-6">
        Thống kê danh sách sản phẩm
      </h1>
      <div className="flex w-full gap-4">
        <div className="flex items-center justify-center w-1/2">
          <div className="w-full max-w-[600px]">
            <h2 className="text-base font-semibold text-left mb-3 mt-6">
              Danh sách sản phẩm theo thể loại
            </h2>
            <CChart
              type="bar"
              data={{
                labels: categoryList,
                datasets: [
                  {
                    label: "Số lượng sản phẩm",
                    backgroundColor: "#f87979",
                    data: [...productCountArray],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center ">
          <div className="w-full max-w-[450px]">
            <h2 className="text-base font-semibold text-left mb-3 mt-6">
              Danh sách thể loại theo loại
            </h2>
            <CChart
              type="doughnut"
              data={{
                labels: headCategoryList,
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [...headCategoryCountArray],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
