import React, { useEffect, useState, useRef } from "react";
import * as UserService from "../../../service/user.api";
import {
  Image,
  Spin,
  Table,
  Modal,
  Form,
  Upload,
  Input,
  Select,
  Button,
  Space,
  FloatButton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedUserSlice,
  setUserList,
  updateUserList,
} from "../../../redux/slice/user.slice";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import "./user.css";

import { ButtonDelete, ButtonEdit, ExportToExcel } from "../../../components";
import {
  ExclamationCircleFilled,
  SearchOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getRegexPhoneNumber } from "../../../utils/stringsUtils";
import { getBase64 } from "../../../utils/function";
import { deleteImage } from "../../../service/image.api";
import { createImageURL } from "../../../service/routers";
const { confirm } = Modal;
export default function UserList() {
  const userList = useSelector((state) => state.user.userList);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const defaultData = {
    name: "",
    email: "",
    phone: "",
    role: 3,
    address: "",
    avatar: "",
  };

  useEffect(() => {
    if (!userList) {
      handleGetAllUser();
    }
  }, []);

  // Lay danh sach nguoi dung
  const handleGetAllUser = async () => {
    setIsLoading(true);
    const res = await UserService.getAllUser();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    } else {
      setErrAlert(res.message);
      setTimeout(() => {
        setNullAlert();
      }, 2000);
    }
    setIsLoading(false);
  };

  // user Func
  const editUser = async (id, data) => {
    const res = await UserService.updateUser(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateUserList({ _id: id, ...data }));
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        onCancel();
        setFileList([]);
        dispatch(setNullAlert());
      }, 2000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    }
  };
  const deleteUser = async (id) => {
    const res = await UserService.deleteUser(id, user.access_token);
    if (res.status === "OK") {
      dispatch(deletedUserSlice(id));
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
  const deleteManyUsers = async (ids) => {
    const res = await UserService.deleteManyUser(ids, user.access_token);
    if (res.status === "OK") {
      handleGetAllUser();
      dispatch(setSuccessAlert(res.message));
      setRowSelectedKeys([]);
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

  //==>Column table
  //func search
  const searchInput = useRef(null);

  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
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
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
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
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(confirm);
            }}
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

  //Column table
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (row, index) => (
        <p className="max-w-[200px]" key={index}>
          {row.slice(0, 2) + row.slice(-4)}{" "}
        </p>
      ),
      width: "10%",
    },

    {
      title: "Tên Người dùng",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      width: "15%",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
      width: "10%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (row) => (
        <p>
          {(row === 1 && "Quản lý") ||
            (row === 2 && "Nhân viên") ||
            (row === 3 && "Người dùng")}
        </p>
      ),
      filters: [
        {
          text: "Quản lý",
          value: 1,
        },
        {
          text: "Nhân viên",
          value: 2,
        },
        {
          text: "Người dùng",
          value: 3,
        },
      ],
      onFilter: (value, record) => {
        if (value === 1) {
          return record?.role === 1;
        }
        if (value === 2) {
          return record?.role === 2;
        }
        return record?.role === 3;
      },
      width: "10%",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (row, index) => (row ? <Image key={index} src={row} /> : null),
      width: "10%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
      width: "20%",
    },

    {
      title: "Action",
      key: "action",
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

  // =>>Modal Edit
  const [editData, setEditData] = useState(defaultData);
  const [idEdit, setIdEdit] = useState("");
  useEffect(() => {
    form.setFieldsValue({
      name: editData?.name,
      email: editData?.email,
      phone: editData?.phone,
      role: editData?.role,
      address: editData?.address,
      avatar: editData?.avatar,
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
      email: row?.email,
      phone: row?.phone,
      role: row?.role,
      address: row?.address,
      avatar: row?.avatar,
    });
  };
  const onCancel = () => {
    setTimeout(() => {
      setEditData(defaultData);
      setFileList([]);
    }, 300);
    setIsOpenEdit(false);
  };
  const onOk = () => {
    editUser(idEdit, editData);
  };

  // =>>>Upload
  const [fileList, setFileList] = useState([]);
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setEditData((prevData) => ({ ...prevData, avatar: file.preview }));
    } else {
      setEditData((prevData) => ({ ...prevData, avatar: "" }));
    }
  };
  // Xoa anh khi upload
  const handleRemove = async (file) => {
    const image = file.response.data;
    await deleteImage(image._id);
  };

  // =>>> Modal del
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteUser(id);
      },
    });
  };
  const dataTable =
    userList?.length > 0 &&
    userList?.map((user) => {
      return { ...user, key: user._id };
    });

  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  const handleDeleteAll = () => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteManyUsers(rowSelectedKeys);
      },
    });
  };

  return (
    <div className="userList mt-5 px-4 mx-auto w-full xl:w-[90%]">
      <h3 className="text-2xl text-blue-600 text-center font-bold mb-2">
        Danh sách người dùng
      </h3>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllUser}
      />
      <FloatButton.BackTop />

      <Spin spinning={isLoading} className="z-30">
        <ExportToExcel data={userList} fileName="danh-sach-nguoi-dung" />
        {rowSelectedKeys.length > 0 && (
          <Button
            style={{
              marginBottom: 10,
            }}
            danger
            onClick={handleDeleteAll}>
            Xóa tất cả
          </Button>
        )}
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={dataTable}
          columns={columns}
          pagination
          bordered
        />
      </Spin>
      <Modal
        forceRender
        open={isOpenEdit}
        title="Cập nhật người dùng"
        onCancel={() => onCancel()}
        onOk={() => onOk()}>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          name="updateUser"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 8 }}>
          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="role"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}
            hasFeedback>
            <Select
              placeholder="Chọn vai trò"
              options={[
                {
                  value: 1,
                  label: "Quản lý",
                },
                {
                  value: 2,
                  label: "Nhân viên",
                },
                {
                  value: 3,
                  label: "Người dùng",
                },
              ]}
            />
          </Form.Item>
          <Form.Item className="flex" label="Ảnh" name="image">
            <Space>
              <Image
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                width={100}
                height={100}
                src={editData?.avatar}
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
        </Form>
      </Modal>
    </div>
  );
}
