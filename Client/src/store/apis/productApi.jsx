import axiosInstance from "../AxiosInterceptor";
import { createProductApiUrl, getAllProducts } from "../endpoints/apiEndpoints";

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
