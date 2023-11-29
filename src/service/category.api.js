import axios from "axios";
import {
  getAllCategoryURL,
  createCategoryURL,
  updateCategoryURL,
  deleteCategoryURL,
} from "./routers";
export const axiosJWT = axios.create();

// get all
export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${getAllCategoryURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// create
export const createCategory = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(`${createCategoryURL}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update
export const updateCategory = async (id, access_token, data) => {
  try {
    const res = await axiosJWT.put(`${updateCategoryURL}/${id}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete
export const deleteCategory = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteCategoryURL}/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
