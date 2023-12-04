import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
  selectedOrder: [],
  fullName: "",
  address: "",
  phone: "",
  paymentMethod: "",
  totalItemsPrice: 0,
  shippingPrice: 0,
  totalOrderPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isSuccessOrder: false,
  isCancelled: false,
  coupon: 0,
  orderList: [],
  allOrderList: [],
  recentOrderList: [],
  orderId: "",
  orderCheckout: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrderItems: (state, action) => {
      state.orderItems.push(action.payload);
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setShippingPrice: (state, action) => {
      state.shippingPrice = action.payload;
    },

    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setTotalItemsPrice: (state, action) => {
      state.totalItemsPrice = action.payload;
    },
    setTotalOrderPrice: (state, action) => {
      state.totalOrderPrice = action.payload;
    },
    setIsPaid: (state, action) => {
      if (action.payload === true) {
        state.paidAt = new Date().toISOString();
        state.isCancelled = false;
      }
      state.isPaid = action.payload;
    },
    setIsCancelled: (state, action) => {
      if (action.payload === true) {
        state.isSuccessOrder = false;
      }
      state.isCancelled = action.payload;
    },
    setIsDelivered: (state, action) => {
      if (action.payload === true) {
        state.deliveredAt = new Date().toISOString();
        state.paidAt = new Date().toISOString();
        state.isPaid = true;
        state.isCancelled = false;
      }
      state.isDelivered = action.payload;
    },
    setIsSuccessOrder: (state, action) => {
      state.isSuccessOrder = action.payload;
    },
    setSelectedOrder: (state, action) => {
      const listChecked = action.payload;
      const orderSelected = state.orderItems?.filter((order) =>
        listChecked?.includes(order?._id)
      );
      state.selectedOrder = orderSelected;
    },
    resetOrder: (state) => {
      state.orderItems = [];
      state.totalItemsPrice = 0;
      state.shippingPrice = 0;
      state.totalOrderPrice = 0;
      state.fullName = "";
      state.address = "";
      state.phone = "";
      state.selectedOrder = [];
      state.user = "";
      state.isPaid = false;
      state.paidAt = "";
      state.paymentMethod = "";
      state.isDelivered = false;
      state.deliveredAt = "";
      state.isSuccessOrder = false;
      state.isCancelled = false;
      state.coupon = 0;
    },
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    addToOrderList: (state, action) => {
      state.orderList
        .push(action.payload)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
    updateOrderItem: (state, action) => {
      const orderEdit = action.payload;
      state.orderList?.find((order, index) => {
        if (order._id === orderEdit._id) {
          state.orderList[index] = orderEdit;
          return true;
        }
        return false;
      });
    },
    setAllOrderList: (state, action) => {
      state.allOrderList = action.payload;
    },
    addToAllOrderList: (state, action) => {
      state.allOrderList
        .push(action.payload)
        .sort((a, b) => b.createdAt - a.createdAt);
    },
    updateAllOrderList: (state, action) => {
      const orderEdit = action.payload;
      state.allOrderList?.find((order, index) => {
        if (order._id === orderEdit._id) {
          state.allOrderList[index] = orderEdit;
          return true;
        }
        return false;
      });
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setRecentOrderList: (state, action) => {
      state.recentOrderList = action.payload;
    },
    setOrderCheckout: (state, action) => {
      state.orderCheckout = action.payload;
    },
  },
});

export const {
  addToOrderItems,
  resetOrder,
  setPhone,
  setFullName,
  setAddress,
  setPaymentMethod,
  setShippingPrice,
  setTotalOrderPrice,
  setCoupon,
  setTotalItemsPrice,
  setSelectedOrder,
  setIsPaid,
  setIsDelivered,
  setIsCancelled,
  setOrderList,
  setIsSuccessOrder,
  addToOrderList,
  updateOrderItem,
  setAllOrderList,
  updateAllOrderList,
  setOrderId,
  setOrderCheckout,
  setRecentOrderList,
  addToAllOrderList,
} = orderSlice.actions;
export default orderSlice.reducer;
