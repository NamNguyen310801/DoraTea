import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "../../../utils/function";
import { deleteImage } from "../../../service/image.api";
import { createImageURL } from "../../../service/routers";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import * as ProductService from "../../../service/product.api";
import {
  addProductSlice,
  setProductList,
} from "../../../redux/slice/product.slice";

const { TextArea } = Input;
export default function NewProduct() {
  const categoryList = useSelector((state) => state.category.categoryList);
  const user = useSelector((state) => state.user.user);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const defaultData = {
    name: "",
    image: "",
    category: "",
    price: "",
    rating: 0,
    description: "",
    discount: 0,
  };

  const [data, setData] = useState(defaultData);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // add product
  const handleAdd = async () => {
    setLoading(true);
    const res = await ProductService.createProduct(data, user.access_token);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      setData(defaultData);
      dispatch(addProductSlice(res.data));
      handleGetAllProduct();
      setTimeout(() => {
        form.resetFields();
        setFileList([]);
        dispatch(setNullAlert());
        setLoading(false);
      }, 2000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
        setLoading(false);
      }, 2000);
    }
  };
  //
  const handleGetAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    if (res.status === "OK") {
      dispatch(setProductList(res.data));
    } else {
      console.log(res.message);
    }
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setData((prevData) => ({ ...prevData, ...changedValues }));
  };
  //Cap nhat anh
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setData((prevData) => ({ ...prevData, image: file.preview }));
    } else {
      setData((prevData) => ({ ...prevData, image: "" }));
    }
  };
  // Bat modal xem anh
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // Xoa anh
  const handleRemove = async (file) => {
    const image = file.response.data;
    await deleteImage(image._id);
  };
  //Tat modal xem anh
  const handleCancelPreview = () => setPreviewOpen(false);

  return (
    <div className="bg-white rounded-sm shadow py-6 px-5 flex flex-col justify-center">
      <h2 className="text-[38px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Thêm sản phẩm
      </h2>
      <Form
        form={form}
        onFinish={handleAdd}
        initialValues={defaultData}
        onValuesChange={handleValuesChange}
        name="createProduct"
        className="border p-3 w-full rounded-lg pt-6 "
        labelCol={{
          sm: { span: 6 },
          lg: { span: 5 },
          xxl: { span: 4 },
        }}
        wrapperCol={{
          sm: { span: 16 },
          lg: { span: 12 },
          xxl: { span: 10 },
        }}
        layout="horizontal">
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
          label="Ảnh"
          name="image"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin!",
            },
          ]}>
          <Upload
            action={`${createImageURL}`}
            listType="picture-card"
            fileList={fileList}
            onRemove={handleRemove}
            onPreview={handlePreview}
            onChange={handleOnchangeImage}>
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}>
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Đánh giá" name="rating">
          <InputNumber min={0} max={5} />
        </Form.Item>

        <Form.Item label="Khuyến mãi" name="discount">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item className="flex items-center flex-row justify-center">
          <Button
            loading={loading}
            className="bg-[#1677ff] hover:bg-[#73adf5] mt-2 hover:scale-95 hover:text-gray-700 w-[200px] "
            type="primary"
            size="large"
            htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
      <Modal open={previewOpen} footer={null} onCancel={handleCancelPreview}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}
