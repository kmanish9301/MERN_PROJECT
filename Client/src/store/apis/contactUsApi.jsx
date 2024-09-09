import axiosInstance from "../AxiosInterceptor";
import { contactUsApiUrl } from "../endpoints/apiEndpoints";

export const contactUsApi = async (data) => {
  try {
    const response = await axiosInstance.post(contactUsApiUrl, data);
    return response;
  } catch (error) {
    return error.response?.data || { message: "An error occurred" };
  }
};
