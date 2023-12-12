import { CChart } from "@coreui/react-chartjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserChart() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);

  useEffect(() => {
    if (!userList) {
      //   handleGetAllProduct();
    }
  }, []);

  //   Đếm số lượng sản phẩm cho mỗi category và thêm vào mảng productCountArray
  const userAdmin = userList?.filter((user) => user.role === 1).length;
  const userStaff = userList?.filter((user) => user.role === 2).length;
  const userUser = userList?.filter((user) => user.role === 3).length;
  console.log(userAdmin, userUser);
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full rounded-sm border border-gray-200 h-full">
      <h1 className="text-xl font-bold text-center mb-3 mt-6">
        Thống kê danh sách người dùng
      </h1>
      <div className="flex w-full items-center justify-center mt-6 ">
        <div className="w-1/2 h-full flex items-center justify-center ">
          <div className="w-full max-w-[450px]">
            <CChart
              type="doughnut"
              data={{
                labels: ["Quản lý", "Nhân viên", "Người dùng"],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [userAdmin, userStaff, userUser],
                  },
                ],
              }}
            />
            <h2 className="text-base font-semibold text-center mt-8 mb-4">
              Danh sách người dùng theo vai trò
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
