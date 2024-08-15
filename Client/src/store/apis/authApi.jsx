import axiosInstance from "../AxiosInterceptor"
import { loginApiUrl, refreshTokenApiUrl, registerApiUrl } from "../endpoints/apiEndpoints";

export const registerApi = async (data) => {
    try {
        const response = await axiosInstance.post(registerApiUrl, data);
        return response;
    } catch (error) {
        return error.response?.data || { message: 'An error occurred' };
    }
};
export const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post(loginApiUrl, data);
        return response;
    } catch (error) {
        return error.response?.data || { message: 'An error occurred' };
    }
};
export const refreshTokenApi = async (data) => {
    try {
        const response = await axiosInstance.post(refreshTokenApiUrl, data);
        return response;
    } catch (error) {
        return error.response?.data || { message: 'An error occurred' };
    }
};