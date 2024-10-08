import axiosInstance from "../AxiosInterceptor";
import {
  createProductApiUrl,
  deleteProductApiUrl,
  getAllProducts,
  updateProductApiUrl,
} from "../endpoints/apiEndpoints";

export const getAllProductsApi = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `${getAllProducts}?${queryParams}`;
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};

export const createProductApi = async (data) => {
  try {
    const response = await axiosInstance.post(createProductApiUrl, data);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};

export const deleteProductApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`${deleteProductApiUrl}/${id}`);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};

export const updateProductApi = async (id, data) => {
  console.log("data:", data);
  try {
    const response = await axiosInstance.put(
      `${updateProductApiUrl}/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};
