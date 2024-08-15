import axiosInstance from "../AxiosInterceptor";
import { getAllUsersApiUrl } from "../endpoints/apiEndpoints";

export const getAllUsersApi = async (data) => {
    try {
        const response = await axiosInstance.get(getAllUsersApiUrl, data);
        return response;
    } catch (error) {
        return error.response?.data || { message: 'An error occurred' };
    }
};