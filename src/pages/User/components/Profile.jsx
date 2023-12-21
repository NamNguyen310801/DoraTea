import React, { useEffect, useState } from "react";
import { Avatar } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { getBase64 } from "../../../utils/function";
import * as UserService from "../../../service/user.api";
import { getRegexPhoneNumber } from "../../../utils/stringsUtils";
import { setUser, updateUser } from "../../../redux/slice/user.slice";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const defaultData = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    avatar: user?.avatar,
  };

  const [data, setData] = useState(defaultData);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user, form]);
  useEffect(() => {
    setData({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar,
    });
  }, [user]);
  const handleUploadImage = async (e) => {
    const image = await getBase64(e.target.files[0]);
    setData((prev) => ({ ...prev, avatar: image }));
  };
  const handleUpdate = async () => {
    const res = await UserService.updateUser(user.id, data, user.access_token);

    if (res.status === "OK") {
      dispatch(setSuccessAlert("Cập nhật thành công"));
      dispatch(
        updateUser({
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
          avatar: data?.avatar,
        })
      );
      // handleGetDetailsUser(user?.id, user?.access_token);
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    } else {
      dispatch(setErrAlert("Cập nhật thất bại"));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    }
  };
  const handleValuesChange = (changedValues, allValues) => {
    setData((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(setUser({ ...res?.data, access_token: token }));
  };
  const layout = {
    labelCol: {
      sm: {
        span: 4,
      },
      md: {
        span: 8,
      },
      lg: {
        span: 6,
      },
    },
    wrapperCol: {
      sm: {
        span: 20,
      },
      md: {
        span: 16,
      },
      lg: {
        span: 18,
      },
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4">
        <h1 className="text-lg text-gray-600 font-semibold">Hồ sơ của tôi</h1>
        <div className="text-sm text-gray-500 ">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <div className="py-8 flex items-center justify-between gap-4">
        <div className="w-4/5 px-4">
          <Form
            initialValues={{
              name: data?.name,
              email: data?.email,
              phone: data?.phone,
              address: data?.address,
            }}
            onValuesChange={handleValuesChange}
            name="profile"
            form={form}
            {...layout}
            className="w-full mt-4">
            <Form.Item name="name" label="Họ và tên">
              <Input placeholder="Nhập họ và tên" className="capitalize" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input placeholder="Nhập email" disabled />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  pattern: getRegexPhoneNumber(),
                  message: "Vui lòng nhập số điện thoại hợp lệ",
                },
              ]}>
              <Input placeholder="Nhập số điện thoại" className="w-full" />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ">
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Form>
        </div>
        <div className="flex flex-col items-center justify-items-start gap-2">
          <div className="w-[100px] h-[100px]">
            <img
              src={data && data.avatar ? data.avatar : Avatar}
              alt="LoginImage"
              className="w-full h-full"
            />
          </div>
          <label htmlFor="profileImage" className="cursor-pointer">
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden "
              onChange={handleUploadImage}
            />
            <p className="mt-2 border px-3 py-2 rounded-md border-gray-500 hover:scale-95">
              Chọn ảnh
            </p>
          </label>
          <div className="mt-2 text-gray-500">
            <p>Dụng lượng file tối đa 1 MB</p>
            <p>Định dạng:.JPEG, .PNG</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={handleUpdate}
          type="primary"
          className="bg-[#1677ff] hover:bg-[#4771a5] w-[150px] mt-2 hover:scale-95 hover:text-gray-100">
          Save
        </Button>
      </div>
    </div>
  );
}
