import axios from "axios";
import { handleTokenRefresh, isTokenExpired } from "../CommonComponents/utils";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && (await isTokenExpired(accessToken))) {
      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          await handleTokenRefresh(refreshToken);
          accessToken = localStorage.getItem("accessToken");
          config.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          localStorage.clear(); // Clear tokens if refresh fails
          //   window.location.href = "/login"; // Redirect to login
          return Promise.reject(error);
        }
      } else {
        localStorage.clear(); // Clear tokens
        window.location.href = "/login"; // Redirect to login
        return Promise.reject("No valid refresh token available");
      }
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await handleTokenRefresh();
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear(); // Clear tokens if refresh fails
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
