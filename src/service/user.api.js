import axios from "axios";
import {
  deleteManyUserURL,
  deleteUserURL,
  forgetPasswordURL,
  getAllURL,
  getDetailURL,
  login,
  logout,
  refreshTokenURL,
  resetPasswordURL,
  signUp,
  updateUserURL,
  verifyOtpURL,
} from "./routers";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${login}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const signUpUser = async (data) => {
  try {
    const res = await axios.post(`${signUp}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const logoutUser = async () => {
  try {
    const res = await axios.post(`${logout}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getDetailUser = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(`${getDetailURL}/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllUser = async () => {
  try {
    const res = await axiosJWT.get(`${getAllURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateUserURL}/${id}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteUser = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteUserURL}/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteManyUser = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(`${deleteManyUserURL}`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const refreshToken = async (refToken) => {
  try {
    const res = await axios.post(
      `${refreshTokenURL}`,
      {},
      {
        headers: {
          token: `Bearer ${refToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const forgetPasswordAPI = async (data) => {
  try {
    const res = await axios.post(`${forgetPasswordURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const verifyOtpAPI = async (data) => {
  try {
    const res = await axios.post(`${verifyOtpURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const resetPasswordAPI = async (data) => {
  try {
    const res = await axios.post(`${resetPasswordURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
