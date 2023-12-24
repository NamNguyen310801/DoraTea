import { useEffect, useRef, useState } from "react";
import {
  Spin,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  FloatButton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { ButtonEdit, ExportToExcel } from "../../../components";
import { convertISOToNewFormat, convertPrice } from "../../../utils/function";
import { getAllOrderAPI, updateOrderAPI } from "../../../service/order.api";
import {
  setAllOrderList,
  setOrderId,
  updateAllOrderList,
} from "../../../redux/slice/order.slice";
import "./order.css";
import { setShowOrder } from "../../../redux/slice/loading.slice";
import OrderAdminDetail from "./OrderAdminDetail";

export default function OrderList() {
  const searchInput = useRef(null);
  const allOrderList = useSelector((state) => state.order.allOrderList);

  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const defaultData = {
    deliveredAt: null,
    isCancelled: false,
    isConfirm: false,
    isDelivered: false,
    isPaid: false,
    isSuccessOrder: false,
    itemsPrice: 0,
    orderItems: [],
    paidAt: null,
    paymentMethod: "",
    fullName: "",
    address: "",
    phone: "",
    shippingPrice: 0,
    totalPrice: 0,
    user: "",
    createdAt: null,
  };

  useEffect(() => {
    if (allOrderList.length === 0) {
      handleGetAllOrderList();
    }
  }, []);
  // Lay danh sach don hang
  const handleGetAllOrderList = async () => {
    setIsLoading(true);
    const res = await getAllOrderAPI(user?.access_token);
    if (res.status === "OK") {
      dispatch(setAllOrderList(res.data));
    } else {
      console.log(res.message);
    }
    setIsLoading(false);
  };
  //
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
  const handleClick = (id) => {
    dispatch(setShowOrder(true));
    dispatch(setOrderId(id));
  };
  const handleOnClose = () => {
    dispatch(setShowOrder(false));
  };
  const columns = [
    {
      title: "Đơn hàng",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
      render: (row, index) => (
        <div
          className="cursor-pointer w-full"
          key={index}
          onClick={() => handleClick(row)}>
          <p className="max-w-[200px]">
            {row.slice(0, 4) + "..." + row.slice(-4)}
          </p>
        </div>
      ),
      width: "8%",
    },

    {
      title: "Tên Người Mua",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },

    {
      title: "Điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (row) => (
        <p>{(row && convertISOToNewFormat(row)) || "Chưa xác định"}</p>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (row) => <p>{convertPrice(row)}</p>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      render: (row) => (
        <p>
          {row === "Offline Payment"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán online"}
        </p>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paid",
      render: (row) => (
        <p>
          {row?.isPaid
            ? `Đã thanh toán: ${convertISOToNewFormat(row?.paidAt)}`
            : "Chờ thanh toán"}
        </p>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => (
        <p>
          {row?.isCancelled
            ? "Đã hủy"
            : row?.isSuccessOrder
            ? "Hoàn thành"
            : row?.isDelivered
            ? "Đã giao"
            : row?.isConfirm
            ? "Đang giao"
            : "Chờ xác nhận"}
        </p>
      ),
    },
    {
      title: "Ngày giao",
      dataIndex: "deliveredAt",
      render: (row) => (
        <p>{(row && convertISOToNewFormat(row)) || "Chưa xác định"}</p>
      ),
    },
    {
      title: "Cập nhật",
      key: "action",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full max-w-[150px]">
          <ButtonEdit onClick={() => openEdit(row)} />
        </div>
      ),
    },
  ];
  const [editData, setEditData] = useState(defaultData);
  const [idEdit, setIdEdit] = useState("");
  const dataTable =
    allOrderList?.length > 0 &&
    allOrderList?.map((order) => {
      return {
        _id: order._id,
        key: order._id,
        orderItems: order.orderItems,
        itemsPrice: order.itemsPrice,
        deliveredAt: order.deliveredAt,
        shippingPrice: order.shippingPrice,
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
        user: order.user,
        name: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        paid: {
          isPaid: order.isPaid,
          paidAt: order.paidAt,
        },
        status: {
          isDelivered: order.isDelivered,
          isSuccessOrder: order.isSuccessOrder,
          isConfirm: order.isConfirm,
          isCancelled: order.isCancelled,
        },
        createdAt: order?.createdAt || null,
      };
    });
  useEffect(() => {
    form.setFieldsValue({
      status: editData?.isCancelled
        ? "Đã hủy"
        : editData?.isSuccessOrder
        ? "Hoàn thành"
        : editData?.isDelivered
        ? "Đã giao"
        : "Đang giao",
      paid: editData?.isPaid ? "Đã thanh toán" : "Chờ thanh toán",
    });
  }, [editData, form]);
  //func update
  const updateOrder = async (id, data) => {
    const res = await updateOrderAPI(id, data);
    const item = allOrderList?.find((item) => item?._id === id);
    if (res.status === "OK") {
      dispatch(
        updateAllOrderList({
          ...item,
          deliveredAt: data?.deliveredAt,
          isPaid: data?.isPaid,
          isConfirm: data?.isConfirm,
          isDelivered: data?.isDelivered,
          isSuccessOrder: data?.isSuccessOrder,
          isCancelled: data?.isCancelled,
          createdAt: item?.createdAt || data?.createdAt,
          updatedAt: data?.updatedAt,
          paidAt: data?.paidAt,
        })
      );
      dispatch(setSuccessAlert(res.message));
      setTimeout(() => {
        onCancel();
        dispatch(setNullAlert());
      }, 1000);
    } else {
      dispatch(setErrAlert(res.message));
      setTimeout(() => {
        dispatch(setNullAlert());
      }, 1000);
    }
  };
  const openEdit = (row) => {
    setIdEdit(row?._id);
    setEditData({
      deliveredAt: row?.deliveredAt,
      isCancelled: row?.status?.isCancelled,
      isConfirm: row?.status?.isConfirm,
      isDelivered: row?.status?.isDelivered,
      isPaid: row?.paid?.isPaid,
      isSuccessOrder: row?.status?.isDelivered,
      itemsPrice: row?.itemsPrice,
      orderItems: [...row?.orderItems],
      paidAt: row?.paid?.paidAt,
      paymentMethod: row?.paymentMethod,
      fullName: row?.name,
      address: row?.address,
      phone: row?.phone,
      shippingPrice: row?.shippingPrice,
      totalPrice: row?.totalPrice,
      user: row?.user,
      createdAt: row?.updatedAt || row?.createdAt,
    });
    setIsOpenEdit(true);
  };
  const onCancel = () => {
    setTimeout(() => {
      setEditData(defaultData);
    }, 300);
    setIsOpenEdit(false);
  };
  const onOk = () => {
    updateOrder(idEdit, editData);
  };

  const onChangeStatus = (value) => {
    if (value === "1") {
      setEditData((prev) => ({
        ...prev,
        isConfirm: true,
        isDelivered: false,
        isSuccessOrder: false,
        isCancelled: false,
        deliveredAt: null,
      }));
    } else if (value === "2") {
      setEditData((prev) => ({
        ...prev,
        isConfirm: true,
        isDelivered: true,
        isSuccessOrder: false,
        isCancelled: false,
        deliveredAt: new Date().toISOString(),
      }));
    } else if (value === "3") {
      setEditData((prev) => ({
        ...prev,
        isConfirm: true,
        isDelivered: true,
        isSuccessOrder: true,
        isPaid: true,
        paidAt: prev?.paidAt || new Date().toISOString(),
        isCancelled: false,
        deliveredAt: prev?.deliveredAt
          ? prev?.deliveredAt
          : new Date().toISOString(),
      }));
    } else if (value === "4") {
      setEditData((prev) => ({
        ...prev,
        isConfirm: false,
        isDelivered: false,
        isSuccessOrder: false,
        isCancelled: true,
        deliveredAt: null,
      }));
    }
  };
  const onChangePaid = (value) => {
    if (value === "1") {
      setEditData((prev) => ({
        ...prev,
        isPaid: false,
        paidAt: null,
      }));
    } else if (value === "2") {
      setEditData((prev) => ({
        ...prev,
        isPaid: true,
        paidAt: new Date().toISOString(),
      }));
    }
  };

  return (
    <div className="orderList relative mt-5 px-4 mx-auto w-full xl:w-[90%]">
      <h3 className="text-2xl text-blue-600 text-center font-bold mb-2">
        Danh sách Đơn Hàng
      </h3>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllOrderList}
      />
      <FloatButton.BackTop />
      <Spin spinning={isLoading} className="z-30">
        <ExportToExcel data={dataTable} fileName="danh-sach-don-hang" />
        <Table dataSource={dataTable} columns={columns} pagination bordered />
      </Spin>
      <Modal
        forceRender
        open={isOpenEdit}
        title="Cập nhật trạng thái đơn hàng"
        onCancel={() => onCancel()}
        onOk={() => onOk()}>
        <Form
          form={form}
          name="updateUser"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 8 }}>
          <Form.Item label="Tình trạng" name="status">
            <Select onChange={(value) => onChangeStatus(value)}>
              <Select.Option value="1">Đang giao</Select.Option>
              <Select.Option value="2">Đã giao</Select.Option>
              <Select.Option value="3">Hoàn thành</Select.Option>
              <Select.Option value="4">Đã Hủy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Thanh toán" name="paid">
            <Select
              onChange={(value) => onChangePaid(value)}
              disabled={editData?.isSuccessOrder || editData?.isCancelled}>
              <Select.Option value="1">Chờ thanh toán</Select.Option>
              <Select.Option value="2">Đã thanh toán</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <OrderAdminDetail onClose={handleOnClose} />
    </div>
  );
}
