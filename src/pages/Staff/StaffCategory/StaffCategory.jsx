import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputValueField } from "../../../utils/function";
import {
  setAllCategory,
  setCategoryList,
  setHeadCategoryList,
} from "../../../redux/slice/category.slice";
import * as CategoryService from "../../../service/category.api";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { ButtonEdit, ButtonDelete } from "../../../components";
import "./staffCategory.css";

const { confirm } = Modal;
export default function StaffCategory() {
  const headCategoryList = useSelector(
    (state) => state.category.headCategoryList
  );
  const allCategory = useSelector((state) => state.category.allCategory);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const defaultEditData = {
    headCategory: "",
    category: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [headCategory, setHeadCategory] = useState("");
  const [category, setCategory] = useState("");
  const [editData, setEditData] = useState(defaultEditData);
  const [idEdit, setIdEdit] = useState("");

  const [form] = Form.useForm();
  const data = {
    headCategory: headCategory,
    category: category,
  };
  useEffect(() => {
    if (!headCategoryList || !allCategory) {
      handleGetCategory();
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      headCategory: editData?.headCategory,
      category: editData?.category,
    });
  }, [editData, form]);

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
  const onReset = () => {
    setHeadCategory("");
    setCategory("");
  };

  // cate func
  const addCategory = async () => {
    const res = await CategoryService.createCategory(data, user.access_token);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      handleGetCategory();
      setTimeout(() => {
        onReset();
        dispatch(setNullAlert());
      }, 2000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  const editCategory = async (id, data) => {
    const res = await CategoryService.updateCategory(
      id,
      user.access_token,
      data
    );

    if (res.status === "OK") {
      handleGetCategory();
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        onCancel();
        dispatch(setNullAlert());
      }, 2000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };
  const deleteCategory = async (id) => {
    const res = await CategoryService.deleteCategory(id, user.access_token);
    console.log(res);
    if (res.status === "OK") {
      handleGetCategory();
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    }
  };

  // Form table
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (row) => (
        <p className="max-w-[200px]">{row.slice(0, 2) + row.slice(-4)} </p>
      ),
      width: "15%",
    },
    {
      title: "Loại thể loại",
      dataIndex: "headCategory",
      filters: [
        {
          text: "Drink",
          value: "Drink",
        },
        {
          text: "Food",
          value: "Food",
        },
      ],
      onFilter: (value, record) => record.headCategory.startsWith(value),
      width: "30%",
    },
    {
      title: "Tên thể loại",
      dataIndex: "category",
      width: "30%",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      key: "action",
      title: "Action",
      render: (row) => (
        <div className="flex items-center justify-between max-w-[150px]">
          <ButtonEdit onClick={() => editModal(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
      width: "10%",
    },
  ];

  // Modal func
  const editModal = (row) => {
    setIsOpenEdit(true);
    setIdEdit(row._id);
    setEditData({
      headCategory: row.headCategory,
      category: row.category,
    });
  };
  const handleValuesChange = (changedValues, allValues) => {
    setEditData((prevData) => ({ ...prevData, ...changedValues }));
  };
  const showDeleteConfirm = (row) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteCategory(row);
      },
    });
  };
  const onCancel = () => {
    setEditData(defaultEditData);
    setIdEdit("");
    setIsOpenEdit(false);
  };
  // Selection table
  const dataTable =
    allCategory?.length > 0 &&
    allCategory?.map((cate) => {
      return { ...cate, key: cate._id };
    });
  return (
    <div className="bg-white rounded-sm shadow py-6 px-8 flex flex-col  justify-center">
      <h2 className="text-[28px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Quản lý Thể Loại
      </h2>
      <FloatButton.BackTop type="primary" />
      <div className="flex gap-8 mt-4 bg-lightOverlay transition duration-700">
        <Tooltip title="Thêm thể loại" placement="right">
          <Button
            className={`${isOpen ? "hidden" : ""} transition duration-700`}
            style={{
              height: "180px",
              width: "180px",
              borderRadius: "8px",
              borderStyle: "dashed",
            }}
            onClick={() => setIsOpen(true)}>
            <PlusOutlined style={{ fontSize: "60px" }} />
          </Button>
        </Tooltip>

        <div
          className={`${
            isOpen ? " " : "hidden"
          }  flex gap-8 mx-auto transition duration-700`}>
          <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
            <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
              Thêm thể loại
            </h3>
            <div className="flex w-full items-center justify-center gap-4">
              <div className="w-full">
                <p className="text-sm text-gray-600 font-semibold">
                  Loại thể loại:
                </p>
                <div className="w-full flex items-center justify-around gap-3 flex-wrap">
                  {headCategoryList &&
                    headCategoryList?.map((data, index) => (
                      <p
                        key={index}
                        onClick={() => setHeadCategory(data)}
                        className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-e-gray-200 backdrop-blur-md hover:bg-slate-200 hover:text-textColor dark:text-white dark:bg-lightOverlay ${
                          data === headCategory
                            ? "bg-red-400 text-white"
                            : "bg-transparent"
                        }`}>
                        {data}
                      </p>
                    ))}
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm  text-gray-600 dark:text-white font-semibold">
                  Tên thể loại:
                </p>
                <InputValueField
                  type={"text"}
                  placeHolder={"Nhập tên thể loại "}
                  stateFunc={setCategory}
                  stateValue={category}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 w-[240px]">
            <button
              type="button"
              onClick={addCategory}
              className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-purple-500 to-blue-400 text-gray-900 hover:from-purple-600 hover:to-blue-500 dark:text-white
           hover:text-white hover:bg-blue-500 cursor-pointer active:scale-95">
              Thêm
            </button>

            <button
              type="button"
              onClick={onReset}
              className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-teal-300 to-lime-300 text-gray-900 hover:text-white hover:from-teal-400 hover:to-lime-400  cursor-pointer active:scale-95 dark:text-white">
              Làm mới
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onReset();
              }}
              className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
              Đóng
            </button>
          </div>
        </div>
      </div>
      <div className="staffCategory mt-5 mx-auto w-full md:w-[80%] xl:w-[75%]">
        <h3 className="text-xl text-blue-600 text-center font-semibold mb-4">
          Danh sách thể loại{" "}
        </h3>

        <Table dataSource={dataTable} columns={columns} bordered />
        <Modal
          forceRender
          className="category-modal"
          open={isOpenEdit}
          title="Cập nhật thể loại"
          onCancel={() => onCancel()}
          onOk={() => editCategory(idEdit, editData)}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="Update category">
            <Form.Item name="headCategory" label="Loại thể loại">
              <Select>
                {headCategoryList?.map((cate, index) => (
                  <Select.Option value={cate} key={index}>
                    {cate}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Tên thể loại" name="category">
              <Input placeholder="Nhập tên thể loại" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
