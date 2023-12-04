import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { SiAdguard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Image, Input, Modal, Rate, Typography } from "antd";
import {
  ExclamationCircleFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  addToOrderItems,
  resetOrder,
  updateOrderItem,
} from "../../../redux/slice/order.slice";
import { convertPrice } from "../../../utils/function";
import { cancelOrderAPI } from "../../../service/order.api";
import OrderDetailItem from "./OrderDetailItem";
import { setShowRateModal } from "../../../redux/slice/loading.slice";
import { setProductRate } from "../../../redux/slice/product.slice";
import { createReviewAPI } from "../../../service/product.api";
import {
  setErrAlert,
  setNullAlert,
  setSuccessAlert,
} from "../../../redux/slice/alert.slice";
const { confirm } = Modal;
export default function OrderDetail() {
  const { id } = useParams();
  const orderList = useSelector((state) => state.order.orderList);
  const showRateModal = useSelector((state) => state.loading.showRateModal);
  const productRate = useSelector((state) => state.product.productRate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderDetail, setDetail] = useState(null);
  const orderItems = useSelector((state) => state.order.orderItems);

  useEffect(() => {
    if (id) {
      const order = orderList?.find((order) => order._id === id) || null;
      setDetail(order);
    }
  }, [id]);
  const handleCancel = async () => {
    const res = await cancelOrderAPI(orderDetail?._id);
    if (res.status === "OK") {
      dispatch(
        updateOrderItem({
          ...orderDetail,
          isConfirm: false,
          isDelivered: false,
          isSuccessOrder: false,
          isCancelled: true,
        })
      );
    }
  };
  const reviewProduct = async (data) => {
    const res = await createReviewAPI(data);
    if (res.status === "OK") {
      dispatch(setSuccessAlert(res.message));
      dispatch(setShowRateModal(false));
      dispatch(setProductRate(null));
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
  const handleCancelModal = () => {
    confirm({
      title: "Bạn có chắc chắn muốn hủy không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        handleCancel();
      },
    });
  };
  const handleBuyAgain = async () => {
    if (orderItems?.length > 0) {
      dispatch(resetOrder());
    }
    orderDetail?.orderItems?.map((item) => dispatch(addToOrderItems(item)));
    setTimeout(() => {
      navigate("/createOrder");
    }, 1000);
  };
  // const
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    rating: 2.5,
    description: "",
  });
  useEffect(() => {
    form.setFieldsValue({
      rating: formData?.rating,
      description: formData?.description,
    });
  }, [formData, form]);
  const handleValuesChange = (changedValues, allValues) => {
    setFormData((prevData) => ({ ...prevData, ...changedValues }));
  };
  const onCancel = () => {
    setFormData();
    dispatch(setShowRateModal(false));
    dispatch(setProductRate(null));
  };
  const onOk = () => {
    setFormData();
    reviewProduct({
      productId: productRate?._id,
      rating: formData?.rating,
      description: formData?.description,
    });
  };
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  return (
    <div className="min-h-[740px] relative">
      <main className="rounded-sm block">
        <section>
          <div className="px-6 py-5 text-sm/4 flex justify-between items-center">
            <span
              onClick={() => navigate(-1)}
              className="flex mr-4 cursor-pointer items-center text-[rgba(0,0,0,0.54)] border-none bg-none p-0">
              <RiArrowLeftSLine className="text-xl" />
              <span>TRỞ LẠI</span>
            </span>
            <div className="flex text-right">
              <span className="text-[rgb(238,77,45)] uppercase font-semibold ">
                {orderDetail?.isCancelled
                  ? "Đã hủy"
                  : orderDetail?.isSuccessOrder
                  ? "Hoàn thành"
                  : orderDetail?.isDelivered
                  ? "Đã giao"
                  : orderDetail?.isConfirm
                  ? "Đang giao"
                  : "Chờ xác nhận"}
              </span>
            </div>
          </div>
        </section>
        <section>
          <div className="py-3 px-6 flex flex-nowrap items-center justify-between">
            <div className="pr-3 text-left break-words text-gray-500 text-sm/4">
              {!orderDetail?.isCancelled
                ? orderDetail?.isSuccessOrder
                  ? " Đơn hàng đã thành công, bạn có thể mua lại sản phẩm hoặc tiếp tục mua sắm tại trang chủ nhé!"
                  : " Trong thời gian này, bạn có thể liên hệ với Người bán để xác nhận thêm thông tin đơn hàng nhé!"
                : " Đơn hàng đã được hủy, bạn có thể mua lại sản phẩm hoặc tiếp tục mua sắm tại trang chủ nhé!"}
            </div>
            <div>
              {orderDetail?.isCancelled || orderDetail?.isSuccessOrder ? (
                <button
                  onClick={() => handleBuyAgain()}
                  className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md bg-orange-500 text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-orange-600">
                  Mua lại
                </button>
              ) : (
                <button className="font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-blue-300">
                  Liên hệ Người bán
                </button>
              )}
            </div>
          </div>
        </section>
        <section>
          <div className="py-3 px-6 flex flex-nowrap items-center justify-end">
            {!orderDetail?.isDelivered || !orderDetail?.isSuccessOrder ? (
              <div onClick={() => handleCancelModal()}>
                <button
                  className={`${
                    orderDetail?.isCancelled ? "hidden" : ""
                  } font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-red-300`}>
                  Hủy đơn hàng
                </button>
              </div>
            ) : (
              <div onClick={() => navigate("/")}>
                <button
                  className={`font-normal text-sm min-w-[150px] min-h-[40px] px-5 py-2 capitalize rounded-md text-ellipsis overflow-hidden outline-none w-[220px] border hover:bg-blue-300`}>
                  Trang trủ
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="p-5 text-lg">
            <div className="pb-3 flex justify-between items-end">
              <div className="capitalize text-gray-800 text-xl/6">
                Địa chỉ nhận hàng
              </div>
            </div>
            <div className="flex">
              <div className="max-w-full flex-1 pt-2 pr-4">
                <div className="max-w-full mb-2 overflow-hidden capitalize text-ellipsis text-gray-700 ">
                  Người nhận: {orderDetail?.shippingAddress?.fullName}
                </div>
                <div className="text-base whitespace-pre-line text-gray-500 ">
                  <span>
                    Số điện thoại: {orderDetail?.shippingAddress?.phone}
                  </span>
                  <br />
                  <span>Địa chỉ: {orderDetail?.shippingAddress?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div>
              <div className="py-3 px-6">
                <div className="pb-3 flex items-center justify-start">
                  <div className="flex items-center">
                    <div className="text-sm/4 uppercase font-semibold text-gray-700">
                      MĐH: {orderDetail?._id}
                    </div>
                  </div>
                </div>
                <div className="border-b" />
                {orderDetail?.orderItems.map((item) => (
                  <OrderDetailItem item={item} key={item?._id} />
                ))}
              </div>

              <div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base">
                    <span>Tổng tiền hàng</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] break-words text-black/80 w-[240px] text-base ">
                    <div>{convertPrice(orderDetail?.itemsPrice)}</div>
                  </div>
                </div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base">
                    <span>Phí vận chuyển</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] text-base break-words text-black/80 w-[240px] ">
                    <div>{convertPrice(orderDetail?.shippingPrice)}</div>
                  </div>
                </div>
                <div className="px-6 flex justify-end text-right border-b border-dotted border-black/[0.09] bg-[rgb(255,254,250)] ">
                  <div className="px-[10px] py-[13px] text-black/50 text-base ">
                    <span>Thành tiền</span>
                  </div>
                  <div className="py-[13px] pl-[10px] border-l border-dotted border-black/[0.09] break-words text-black/80 w-[240px] ">
                    <div className="text-[rgb(238,77,45)] text-xl font-semibold">
                      {convertPrice(orderDetail?.totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="px-6 flex justify-end text-right border-none border-black/[0.09] bg-[rgb(255,254,250)] text-base">
            <div className="px-[10px] py-[13px]  min-w-[200px] flex items-center gap-x-2">
              <span className="cursor-pointer">
                <SiAdguard className="text-[#ee4d24]" />
              </span>
              <span className="align-middle">Phương thức Thanh toán</span>
            </div>
            <div className="py-[13px] pl-[10px] w-[240px] break-words text-black/80 border-l border-dotted border-black/[0.09]">
              <div>
                {orderDetail?.paymentMethod === "Offline Payment"
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán online"}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal
        forceRender
        className="rate-modal"
        open={showRateModal}
        title="Đánh giá sản phẩm"
        onCancel={() => onCancel()}
        onOk={onOk}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{
            background: "#E8E8E8",
            borderRadius: "6px",
            height: "100%",
            padding: "5px",
          }}
          onValuesChange={handleValuesChange}
          name="rate-product">
          <Form.Item
            style={{
              display: "flex",
            }}>
            <Image width={40} src={productRate?.image} />
            <Typography.Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginLeft: "8px",
              }}>
              Trà sữa Socola
            </Typography.Text>
          </Form.Item>
          <Form.Item name="rating" label="Đánh giá">
            <Rate
              style={{
                color: "#FFCC00",

                width: "100%",
              }}
              allowHalf
              allowClear={false}
              character={({ index }) => customIcons[index + 1]}
            />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập ý kiến của bạn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
