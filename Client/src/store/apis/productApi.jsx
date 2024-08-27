import axiosInstance from "../AxiosInterceptor";
import { getAllProducts } from "../endpoints/apiEndpoints";

export const getAllProductsApi = async (data) => {
  try {
    const response = await axiosInstance.get(getAllProducts, data);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};
