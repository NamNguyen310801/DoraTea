// item admin
export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
//convert image to base64
export const getBase64 = (file) => {
  const data = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  return data;
};
//Ktra co la json string khong
export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

//
export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};
//
export const convertPrice = (price) => {
  try {
    // const result = price?.toLocaleString().replaceAll(",", ".");
    const result = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return result;
  } catch (error) {
    return null;
  }
};
//conert time
export const convertISOToNewFormat = (isoTime) => {
  const date = new Date(isoTime);

  // Lấy giờ, phút và giây
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};
export const getCurrentYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
};
export const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}/${currentDate.getMonth()}`;
  return currentMonth;
};
export const calculateMonthYearlyOrder = (orders) => {
  const yearlyOrder = {};
  // Lặp qua danh sách đơn hàng
  orders.forEach((order) => {
    // Lấy năm và tháng từ createdAt
    const year = new Date(order?.createdAt).getFullYear();
    const month = new Date(order?.createdAt).getMonth() + 1;
    // Tạo năm nếu chưa tồn tại
    if (!yearlyOrder[year]) {
      yearlyOrder[year] = {};
    }
    // Tạo tháng và gán giá trị là 0 nếu chưa tồn tại
    yearlyOrder[year][month] = yearlyOrder[year][month] || {
      total: 0,
      success: 0,
      unSuccess: 0,
    };
    // Thêm tien vào tổng tiền theo tháng
    yearlyOrder[year][month].total += order?.totalPrice;
    if (order?.isSuccessOrder === false) {
      yearlyOrder[year][month].unSuccess += order?.totalPrice;
    }
    if (order?.isSuccessOrder === true) {
      yearlyOrder[year][month].success += order?.totalPrice;
    }
  });
  // Chuyển đổi dữ liệu thành mảng đối tượng mong muốn
  const resultArray = [];
  // Lặp qua tất cả các năm và tháng
  for (let year in yearlyOrder) {
    for (let month = 1; month <= 12; month++) {
      resultArray.push({
        month: month,
        year: parseInt(year),
        unSuccess: yearlyOrder[year][month]?.unSuccess || 0,
        success: yearlyOrder[year][month]?.success || 0,
        total: yearlyOrder[year][month]?.total || 0,
      });
    }
  }
  return resultArray;
};
export const calculateYearlyOrders = (orders) => {
  const yearlyOrder = {};
  orders.forEach((order) => {
    const year = new Date(order.createdAt).getFullYear();
    const orderAmount = order?.totalPrice;
    if (!yearlyOrder[year]) {
      yearlyOrder[year] = {
        unSuccess: 0,
        success: 0,
        total: 0,
      };
    }

    yearlyOrder[year].total += orderAmount;
    if (order?.isSuccessOrder === false) {
      yearlyOrder[year].unSuccess += orderAmount;
    }
    if (order?.isSuccessOrder === true) {
      yearlyOrder[year].success += orderAmount;
    }
  }); // Chuyển đối tượng thành mảng đối tượng
  const resultArray = Object.keys(yearlyOrder).map((year) => ({
    year: parseInt(year),
    ...yearlyOrder[year],
  }));

  return resultArray;
};
export const revenueByDay = (orders, month) => {
  const monthlyData = {};
  const targetMonth = new Date(month);
  // Lặp qua danh sách đơn hàng
  orders.forEach((order) => {
    // Lấy năm, tháng và ngày từ createdAt
    const orderDate = new Date(order?.createdAt);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth() + 1;
    const day = orderDate.getDate();

    if (
      targetMonth &&
      (month !== targetMonth?.getMonth() + 1 ||
        year !== targetMonth?.getFullYear())
    ) {
      return; // Bỏ qua nếu không phải là tháng cần thống kê
    }

    // Tạo năm nếu chưa tồn tại
    if (!monthlyData[year]) {
      monthlyData[year] = {};
    }

    // Tạo tháng nếu chưa tồn tại
    if (!monthlyData[year][month]) {
      monthlyData[year][month] = {};
    }

    // Tạo ngày và gán giá trị là 0 nếu chưa tồn tại
    monthlyData[year][month][day] = monthlyData[year][month][day] || {
      total: 0,
      success: 0,
      unSuccess: 0,
    };

    // Thêm tiền vào tổng tiền theo ngày
    const totalRevenue = order?.totalPrice;
    monthlyData[year][month][day].total += totalRevenue;

    if (order?.isSuccessOrder === false) {
      monthlyData[year][month][day].unSuccess += totalRevenue;
    }

    if (order?.isSuccessOrder === true) {
      monthlyData[year][month][day].success += totalRevenue;
    }
  });

  // Chuyển đổi dữ liệu thành mảng đối tượng mong muốn
  const resultArray = [];

  // Lặp qua tất cả các năm và ngày
  for (let year in monthlyData) {
    const month = targetMonth && targetMonth?.getMonth() + 1; // Chỉ lấy dữ liệu cho tháng đã chọn
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = monthlyData[year][month][day] || {
        total: 0,
        success: 0,
        unSuccess: 0,
      };
      resultArray.push({
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        unSuccess: dayData.unSuccess || 0,
        success: dayData.success || 0,
        total: dayData.total || 0,
      });
    }
  }

  return resultArray;
};
