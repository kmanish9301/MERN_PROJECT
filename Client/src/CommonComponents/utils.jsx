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
        console.error('Error decoding token:', error);
        return true;
    }
};

export const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        return Promise.reject('No refresh token available');
    }
    try {
        const response = await store.dispatch(refreshTokenAction(refreshToken)).then(action => action.payload);
        const { token } = response;
        if (token) {
            localStorage.setItem('accessToken', token);
            return Promise.resolve();
        } else {
            return Promise.reject('Failed to refresh token');
        }
    } catch (error) {
        return Promise.reject('Failed to refresh token');
    }
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return false;
    }

    try {
        const tokenPayload = jwtDecode(accessToken);
        const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

        if (isTokenExpired) {
            localStorage.removeItem('accessToken');
            return false;
        }

        return true;
    } catch (e) {
        localStorage.removeItem('accessToken');
        return false;
    }
};
