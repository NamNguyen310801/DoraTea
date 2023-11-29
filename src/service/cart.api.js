import axios from "axios";
import {
  addToCartURL,
  deleteCartItemURL,
  deleteCartURL,
  deleteManyCartItemURL,
  getCartItemURL,
  getCartListURL,
  updateCartItemURL,
} from "./routers";

const axiosJWT = axios.create();

//add to cart
export const addToCarAPI = async (data) => {
  try {
    const res = await axios.post(`${addToCartURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//get cart list
export const getCartListAPI = async (id) => {
  try {
    const res = await axios.get(`${getCartListURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//get cart list
export const getCartItemAPI = async (id) => {
  try {
    const res = await axios.get(`${getCartItemURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//update CartItem
export const updateCartItemAPI = async (data) => {
  try {
    const res = await axios.put(`${updateCartItemURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
//delete CartItem
export const deleteCartItemAPI = async (id) => {
  try {
    const res = await axiosJWT.delete(`${deleteCartItemURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//delete ManyCartItem
export const deleteManyCartItemAPI = async (data) => {
  try {
    const res = await axiosJWT.post(`${deleteManyCartItemURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
//delete Cart
export const deleteCartAPI = async () => {
  try {
    const res = await axios.post(`${deleteCartURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
