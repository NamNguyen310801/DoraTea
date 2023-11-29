import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Space, Upload } from "antd";
import React from "react";
import * as UserService from "../../../service/user.api";
import { createImageURL } from "../../../service/routers";
import { useState } from "react";
import { getBase64 } from "../../../utils/function";
import { deleteImage } from "../../../service/image.api";
import "./user.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegexPassword,
  getRegexPhoneNumber,
} from "../../../utils/stringsUtils";

import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../../redux/slice/alert.slice";
import { setUserList } from "../../../redux/slice/user.slice";
export default function NewUser() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const defaultData = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    phone: "",
    address: "",
    avatar: "",
  };
  const [data, setData] = useState(defaultData);
  const [form] = Form.useForm();

  // Add nguoi dung
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await UserService.signUpUser(data);
      // Hiển thị thông báo lỗi từ máy chủ
      if (res && res.status === "ERROR") {
        dispatch(setWarningAlert(res.message));
        setTimeout(() => {
          dispatch(setNullAlert());
        }, 2000);
      }
      // Hiển thị thành công
      else if (res.data) {
        dispatch(setSuccessAlert(res.message));
        handleGetAllUser();
        setTimeout(() => {
          form.resetFields();
          setData(defaultData);
          setFileList([]);
          dispatch(setNullAlert());
        }, 2000);
      }
    } catch (error) {
      dispatch(setErrAlert(error));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  const handleGetAllUser = async () => {
    const res = await UserService.getAllUser();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
  };
  const handleValuesChange = (changedValues, allValues) => {
    setData((prevData) => ({ ...prevData, ...changedValues }));
  };
  //Upload
  const [fileList, setFileList] = useState([]);
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setData((prevData) => ({ ...prevData, avatar: file.preview }));
    } else {
      setData((prevData) => ({ ...prevData, avatar: "" }));
    }
  };
  // Xoa anh khi upload
  const handleRemove = async (file) => {
    const image = file.response.data;
    await deleteImage(image._id);
  };
  return (
    <div className="bg-white rounded-sm shadow py-6 px-5 flex flex-col   justify-center">
      <h2 className="text-[38px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Thêm người dùng
      </h2>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        name="createUser"
        className="newUser border p-3 w-full rounded-lg pt-6 "
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
          label="Họ và tên"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin!",
              whitespace: true,
            },
          ]}
          style={{
            fontSize: 18,
          }}>
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin!",
            },
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng E-mail!",
            },
          ]}>
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin!",
            },
            {
              pattern: getRegexPassword(),
              message:
                "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
            },
          ]}
          hasFeedback>
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Xác nhận Mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
              },
            }),
          ]}>
          <Input.Password placeholder="Xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item label="Vai trò" name="isAdmin" hasFeedback>
          <Select
            onChange={(value) =>
              setData((prev) => ({
                ...prev,
                isAdmin: JSON.parse(value),
              }))
            }>
            <Select.Option value="true">Quản lý</Select.Option>
            <Select.Option value="false">Người dùng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Ảnh" name="avatar">
          <Space>
            <Image
              style={{
                objectFit: "cover",
                borderRadius: 8,
                overflow: "hidden",
              }}
              width={100}
              height={100}
              src={data?.avatar}
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

        <Form.Item name="address" label="Địa chỉ" hasFeedback>
          <Input placeholder="Nhập số điạ chỉ" />
        </Form.Item>
        <Form.Item
          label="Điện thoại"
          name="phone"
          rules={[
            {
              pattern: getRegexPhoneNumber(),
              message: "Vui lòng nhập số điện thoại hợp lệ",
            },
          ]}
          hasFeedback>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item className="flex items-center flex-row justify-center">
          <Button
            loading={loading}
            className="bg-[#1677ff] hover:bg-[#73adf5] mt-2 hover:scale-95 hover:text-gray-700 w-[200px] "
            type="primary"
            size="large"
            onClick={handleSubmit}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
