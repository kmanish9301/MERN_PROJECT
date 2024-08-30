import { jwtDecode } from "jwt-decode";
import { refreshTokenAction } from "../store/actions/actions";
import { store } from "../store/store";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const handleTokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject("No refresh token available");
  }

  try {
    const resultAction = await store.dispatch(
      refreshTokenAction({ token: refreshToken })
    );
    const response = resultAction.payload;

    if (response?.status === 200) {
      const { token, refreshToken: newRefreshToken } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      return Promise.resolve();
    } else {
      return Promise.reject("Failed to refresh token");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // You might want to handle specific error cases here, e.g., removing tokens only for certain types of errors
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    return Promise.reject(error);
  }
};

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return false;
  }

  try {
    const tokenPayload = jwtDecode(accessToken);
    const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

    if (isTokenExpired) {
      localStorage.removeItem("accessToken");
      return false;
    }

    return true;
  } catch (e) {
    localStorage.removeItem("accessToken");
    return false;
  }
};
