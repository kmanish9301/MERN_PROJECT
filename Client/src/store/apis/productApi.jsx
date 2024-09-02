import axiosInstance from "../AxiosInterceptor";
import { getAllProducts } from "../endpoints/apiEndpoints";

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
