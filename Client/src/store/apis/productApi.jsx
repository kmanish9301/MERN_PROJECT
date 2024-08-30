import axiosInstance from "../AxiosInterceptor";
import { getAllProducts, searchString } from "../endpoints/apiEndpoints";

export const getAllProductsApi = async (data) => {
  const urlParams = data
    ? `${getAllProducts}?${searchString}=${encodeURIComponent(data)}`
    : getAllProducts;
  try {
    const response = await axiosInstance.get(urlParams);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};
