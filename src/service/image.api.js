import axios from "axios";
import { createImageURL, deleteImageURL } from "./routers";

//getAll
export const createImage = async (file) => {
  try {
    const res = await axios.post(`${createImageURL}`, file);
    return res.data;
  } catch (error) {
    return error;
  }
};

//
export const deleteImage = async (id) => {
  try {
    const res = await axios.delete(`${deleteImageURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
