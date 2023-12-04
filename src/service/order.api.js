import axios from "axios";

import {
  cancelOrderURL,
  confirmOrderURL,
  createOrderURL,
  getAllOrderDetailsURL,
  getAllOrderURL,
  getOrderDetailsURL,
  getOrdersByMonthURL,
  getOrdersMonthCountURL,
  getRecentOrderURL,
  sendConfirmOrderURL,
  sendSuccessOrderURL,
  successOrderURL,
  updateOrderURL,
} from "./routers";
const axiosJWT = axios.create();
//createOrder
export const createOrderAPI = async (data) => {
  try {
    const res = await axiosJWT.post(`${createOrderURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
//updateOrder
export const updateOrderAPI = async (id, data) => {
  try {
    const res = await axios.put(`${updateOrderURL}/${id}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//getAllOrderDetails
export const getAllOrderDetailsAPI = async (id) => {
  try {
    const res = await axios.get(`${getAllOrderDetailsURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//getAllOrder
export const getAllOrderAPI = async (access_token) => {
  try {
    const res = await axiosJWT.get(`${getAllOrderURL}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
//getRecent
export const getRecentOrderAPI = async (access_token) => {
  try {
    const res = await axiosJWT.get(`${getRecentOrderURL}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
//getOrdersByMonth
export const getOrdersByMonthAPI = async (access_token, year, month) => {
  try {
    const res = await axiosJWT.get(`${getOrdersByMonthURL}/${year}/${month}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getOrdersMonthCountAPI = async () => {
  try {
    const res = await axios.get(`${getOrdersMonthCountURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//getDetail
export const getOrderDetailsAPI = async (id) => {
  try {
    const res = await axios.get(`${getOrderDetailsURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//cancel
export const cancelOrderAPI = async (id) => {
  try {
    const res = await axios.delete(`${cancelOrderURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//success
export const successOrderAPI = async (id) => {
  try {
    const res = await axios.delete(`${successOrderURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//confirm
export const confirmOrderAPI = async (id) => {
  try {
    const res = await axios.delete(`${confirmOrderURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//confirm
export const sendConfirmOrderAPI = async (data) => {
  try {
    const res = await axios.post(`${sendConfirmOrderURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}; //confirm
export const sendSuccessOrderAPI = async (data) => {
  try {
    const res = await axios.post(`${sendSuccessOrderURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
