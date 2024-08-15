import axios from 'axios';
import { handleTokenRefresh, isTokenExpired } from '../CommonComponents/utils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && await isTokenExpired(token)) {
            if (!refreshToken || await isTokenExpired(refreshToken)) {
                return Promise.reject('No valid refresh token available');
            }
            await handleTokenRefresh(); // Refresh the token
            token = localStorage.getItem('accessToken'); // Get the new token
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await handleTokenRefresh();
                originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
