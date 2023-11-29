import React from "react";
import { Button } from "antd";
import ExcelJS from "exceljs";

const ExportToExcel = ({ data, fileName }) => {
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách");

    // Tạo hàng tiêu đề
    const headerRow = worksheet.addRow(Object.keys(data[0]));
    headerRow.font = { bold: true };

    // Thêm dữ liệu
    data.forEach((item) => {
      worksheet.addRow(Object.values(item));
    });

    // Tạo file Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx` || "danh_sach.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      style={{
        marginRight: 10,
      }}
      onClick={handleExport}>
      Xuất Excel
    </Button>
  );
};

export default ExportToExcel;
