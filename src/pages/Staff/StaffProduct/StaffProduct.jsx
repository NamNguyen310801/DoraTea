import React, { useEffect, useRef, useState } from "react";
import { ButtonDelete, ButtonEdit, ExportToExcel } from "../../../components";
import {
  deletedProductSlice,
  setProductList,
  updateProductList,
} from "../../../redux/slice/product.slice";
import { useDispatch, useSelector } from "react-redux";
import * as ProductService from "../../../service/product.api";
import {
  Image,
  Rate,
  Spin,
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  InputNumber,
  Upload,
  FloatButton,
} from "antd";
import "./staffProduct.css";
import {
  ExclamationCircleFilled,
  SearchOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { getBase64 } from "../../../utils/function";
import { createImageURL } from "../../../service/routers";
import { deleteImage } from "../../../service/image.api";

const { TextArea } = Input;
const { confirm } = Modal;
export default function StaffProduct() {
  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.category.categoryList);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [form] = Form.useForm();
  const searchInput = useRef(null);

  useEffect(() => {
    if (!productList) {
      handleGetAllProduct();
    }
  }, []);
  //func search
  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const filtersCategoryList = categoryList?.map((item) => ({
    text: item,
    value: item,
  }));
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes(value?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  //
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (row, index) => (
        <p className="max-w-[200px]" key={index}>
          {row?.slice(0, 2) + row?.slice(-4)}
        </p>
      ),
      width: "7%",
    },

    {
      title: "Ảnh",
      dataIndex: "image",
      render: (row, index) => <Image key={index} src={row} />,
      width: "9%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      width: "11%",
    },
    {
      title: "Thể Loại",
      dataIndex: "category",
      filters: filtersCategoryList,
      onFilter: (value, record) => record?.category.startsWith(value),
      width: "10%",
    },

    {
      title: "Mô Tả",
      dataIndex: "description",
      render: (row, index) => (
        <p key={index} className="text-justify">
          {row}
        </p>
      ),
      width: "21%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (row, index) => <p key={index}>{`${row} VNĐ`}</p>,
      sorter: (a, b) => a?.price - b?.price,
      filters: [
        {
          text: ">= 100000 VNĐ",
          value: 4,
        },
        {
          text: ">= 75000 VNĐ",
          value: 3,
        },
        {
          text: ">= 50000 VNĐ",
          value: 2,
        },
        {
          text: ">= 25000 VNĐ",
          value: 1,
        },
        {
          text: "< 25000 VNĐ",
          value: 0,
        },
      ],
      onFilter: (value, record) => {
        if (value === 0) {
          return record?.price < 25000;
        } else if (value === 1) {
          return record?.price >= 25000;
        } else if (value === 2) {
          return record?.price >= 50000;
        } else if (value === 3) {
          return record?.price >= 75000;
        } else if (value === 4) {
          return record?.price >= 100000;
        }
      },
      width: "7%",
    },
    {
      title: "Khuyến mãi",
      dataIndex: "discount",
      render: (row, index) => <p key={index}>{`${row || 0} %`}</p>,
      sorter: (a, b) => a?.price - b?.price,
      width: "10%",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      render: (row, index) => (
        <Rate key={index} disabled allowHalf defaultValue={row} />
      ),
      sorter: {
        compare: (a, b) => a.rating - b.rating,
      },
      filters: [
        {
          text: "> 3",
          value: ">",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">") {
          return record.rating > 3;
        }
        return record.rating <= 3;
      },
      width: "10%",
    },
    {
      title: "Đã bán",
      dataIndex: "selled",
      render: (row, index) => <p key={index}>{row || 0}</p>,
      sorter: (a, b) => a?.selled - b?.selled,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "< 50",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.selled >= 50;
        }
        return record?.selled < 50;
      },
      width: "8%",
    },
    {
      key: "action",
      title: "Action",
      // dataIndex: "action",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-between max-w-[150px]">
          <ButtonEdit onClick={() => editModal(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
      width: "10%",
    },
  ];

  // Lay danh sach san pham
  const handleGetAllProduct = async () => {
    setIsLoading(true);
    const res = await ProductService.getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      console.log(res.message);
    }
    setIsLoading(false);
  };
  // cate func
  const editProduct = async (id, data) => {
    const res = await ProductService.updateProduct(id, user.access_token, data);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        onCancel();
        dispatch(updateProductList({ _id: id, ...data }));
        setFileList([]);
        dispatch(setNullAlert());
      }, 1500);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    }
  };
  const deleteProduct = async (id) => {
    const res = await ProductService.deleteProduct(id, user.access_token);
    if (res.status === "OK") {
      dispatch(deletedProductSlice(id));
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
  //
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteProduct(id);
      },
    });
  };
  // Modal Edit
  const defaultEditData = {
    name: "",
    image: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    selled: 0,
  };
  const [editData, setEditData] = useState(defaultEditData);
  const [idEdit, setIdEdit] = useState("");
  useEffect(() => {
    form.setFieldsValue({
      name: editData?.name,
      category: editData?.category,
      description: editData?.description,
      price: editData?.price,
      discount: editData?.discount,
      rating: editData?.rating,
      selled: editData?.selled,
    });
  }, [editData, form]);
  const handleValuesChange = (changedValues, allValues) => {
    setEditData((prevData) => ({ ...prevData, ...changedValues }));
  };
  const editModal = (row) => {
    setIsOpenEdit(true);
    setIdEdit(row?._id);
    setEditData({
      name: row?.name,
      image: row?.image,
      category: row?.category,
      description: row?.description,
      price: row?.price,
      discount: row?.discount,
      rating: row?.rating,
      selled: row?.selled,
    });
  };
  const onCancel = () => {
    setTimeout(() => {
      setEditData(defaultEditData);
      setFileList([]);
    }, 300);
    setIsOpenEdit(false);
  };
  const onOk = () => {
    editProduct(idEdit, editData);
  };
  //Upload
  const [fileList, setFileList] = useState([]);
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setEditData((prevData) => ({ ...prevData, image: file.preview }));
    } else {
      setEditData((prevData) => ({ ...prevData, image: "" }));
    }
  };
  // Xoa anh khi upload
  const handleRemove = async (file) => {
    const image = file.response.data;
    await deleteImage(image._id);
  };
  // Selection table
  const dataTable =
    productList?.length > 0 &&
    productList?.map((product) => {
      return { ...product, key: product._id };
    });
  const buttonRef = useRef(null);
  return (
    <div className="staffProduct mt-5 px-4 w-full">
      <h3 className="text-2xl text-blue-600 text-center font-bold mb-4">
        Danh sách sản phẩm
      </h3>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllProduct}
      />
      <FloatButton.BackTop ref={buttonRef.current} />
      <Spin spinning={isLoading} className="z-30">
        <Table dataSource={dataTable} columns={columns} pagination bordered />
      </Spin>
      <Modal
        forceRender
        open={isOpenEdit}
        title="Cập nhật sản phẩm"
        onCancel={() => onCancel()}
        onOk={() => onOk()}>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          name="updateProduct"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 6 }}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Loại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Select>
              {categoryList?.map((cate, index) => (
                <Select.Option value={cate} key={index}>
                  {cate}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <InputNumber min={0} className="w-[150px]" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea
              rows={4}
              style={{
                resize: "none",
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex"
            label="Ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Space>
              <Image
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                width={100}
                height={100}
                src={editData?.image}
              />
              <Upload
                action={`${createImageURL}`}
                fileList={fileList}
                onRemove={handleRemove}
                onChange={handleOnchangeImage}>
                {fileList.length >= 1 ? null : (
                  <Button
                    icon={<UploadOutlined />}
                    style={{
                      marginLeft: 10,
                    }}>
                    Click to Upload
                  </Button>
                )}
              </Upload>
            </Space>
          </Form.Item>

          <Form.Item label="Đánh giá" name="rating">
            <InputNumber min={0} max={5} />
          </Form.Item>

          <Form.Item label="Khuyến mãi" name="discount">
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
