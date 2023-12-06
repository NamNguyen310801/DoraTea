import React, { useState } from "react";
import { signUpImage, SignUpBg } from "../../assets";
import { Button, Form, Input } from "antd";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { getBase64 } from "../../utils/function";
import { signUpUser } from "../../service/user.api";
import { useDispatch } from "react-redux";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
  setWarningAlert,
} from "../../redux/slice/alert.slice";
import { getRegexPassword } from "../../utils/stringsUtils";
// import { getRegexPassword } from "../../utils/stringsUtils";
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const defaultData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  };
  const [data, setData] = useState(defaultData);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await signUpUser(data);
      // Hiển thị thông báo lỗi từ máy chủ
      if (res && res.status === "ERROR") {
        dispatch(setWarningAlert(res.message));
        setTimeout(() => {
          dispatch(setNullAlert());
        }, 2000);
      }
      // Hiển thị thành công
      else if (res.data) {
        dispatch(setSuccessAlert("Đăng ký thành công"));
        setTimeout(() => {
          form.resetFields();
          navigate("/login");
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

  const handleValuesChange = (changedValues, allValues) => {
    setData((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleUploadImage = async (e) => {
    const image = await getBase64(e.target.files[0]);
    setData((prev) => ({ ...prev, image: image }));
  };
  const layout = {
    labelCol: {
      sm: {
        span: 6,
      },
      md: {
        span: 10,
      },
      lg: {
        span: 8,
      },
    },
    wrapperCol: {
      sm: {
        span: 18,
      },
      md: {
        span: 14,
      },
      lg: {
        span: 16,
      },
    },
  };
  return (
    <div className="p-3 md:p-4 w-screen h-screen relative overflow-hidden font-semibold">
      <img
        src={SignUpBg}
        alt="sign-up-bg"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="relative flex w-full h-auto rounded-3xl max-w-[580px] mt-[50px] bg-blue-100/50 mx-auto  items-center flex-col p-4 justify-center z-100">
        <div className="w-[100px] h-[100px] overflow-hidden rounded-full drop-shadow-md shadow-md ">
          <img
            src={data && data.image ? data.image : signUpImage}
            alt="LoginImage"
            className="w-full h-full"
          />
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="absolute bottom-0 h-[30%] bg-gray-500/50 w-full  text-center">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden "
              onChange={handleUploadImage}
            />
          </label>
        </div>
        <Form
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          name="register"
          form={form}
          {...layout}
          className="w-full mt-4">
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
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}>
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>
          <Form.Item className="flex items-center justify-center">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-[#1677ff] hover:bg-[#8bb9f1] mt-2 hover:scale-95 hover:text-gray-700">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <p className="">
          Bạn đã có tải khoản rồi?
          <Link
            to={"/login"}
            className="text-blue-700 underline hover:text-blue-400 ">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
