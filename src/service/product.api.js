import axios from "axios";
import {
  createProductURL,
  deleteProductURL,
  getAllProductURL,
  updateProductURL,
  getDetailProductURL,
  deleteManyProductURL,
  getWithCategoryURL,
  getAllPopularURL,
  getAllDiscountURL,
  createReviewURL,
  updateProductRatingURL,
} from "./routers";
export const axiosJWT = axios.create();

// Lay tat ca san pham
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${getAllProductURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Lay san pham pho bien
export const getPopularProduct = async () => {
  try {
    const res = await axios.get(`${getAllPopularURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
// Lay san pham discount
export const getDiscountProduct = async () => {
  try {
    const res = await axios.get(`${getAllDiscountURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
// Lay san pham theo the loai
export const getWithCategory = async (category) => {
  try {
    const res = await axios.get(`${getWithCategoryURL}/${category}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Lay chi tiet san pham
export const getDetailProduct = async (id) => {
  try {
    const res = await axios.get(`${getDetailProductURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
// Them san pham
export const createProduct = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(`${createProductURL}`, data, {
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
export const updateProduct = async (id, access_token, data) => {
  try {
    const res = await axiosJWT.put(`${updateProductURL}/${id}`, data, {
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
export const deleteProduct = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteProductURL}/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
// delete many
export const deleteManyProduct = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(`${deleteManyProductURL}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
// createReview
export const createReviewAPI = async (data) => {
  try {
    const res = await axios.post(`${createReviewURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
// createReview
export const updateProductRatingAPI = async (data) => {
  try {
    const res = await axios.put(`${updateProductRatingURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
