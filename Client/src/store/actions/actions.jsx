import { authConstants, toggleTheme, userConstants } from "../action-constants/actionTypes";

export const toggleThemeLoading = (payload) => ({
    type: toggleTheme.TOGGLE_THEME_LOADING,
    payload: payload
});
export const toggleThemeAction = (payload) => ({
    type: toggleTheme.TOGGLE_THEME_ACTION,
    payload: payload
});
export const toggleThemeSuccess = (mode) => ({
    type: toggleTheme.SET_TOGGLE_THEME,
    payload: mode
});

export const authLoading = (payload) => ({
    type: authConstants.AUTH_LOADING,
    payload: payload
});

// Register
export const registerAction = (payload) => ({
    type: authConstants.REGISTER_ACTION,
    payload: payload
});
export const registerSuccess = (payload) => ({
    type: authConstants.REGISTER_SUCCESS,
    payload: payload
});
export const registerError = (payload) => ({
    type: authConstants.REGISTER_ERROR,
    payload: payload
});
export const registerReset = () => ({
    type: authConstants.RESET_REGISTER,
});

// Login
export const loginAction = (payload) => ({
    type: authConstants.LOGIN_ACTION,
    payload: payload
});
export const loginSuccess = (payload) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: payload
});
export const loginError = () => ({
    type: authConstants.LOGIN_ERROR,
});
export const loginReset = () => ({
    type: authConstants.RESET_LOGIN,
});

// Auth Refresh
export const refreshTokenAction = (payload) => ({
    type: authConstants.REFRESH_TOKEN_ACTION,
    payload: payload
})
export const refreshTokenSuccess = (payload) => ({
    type: authConstants.REFRESH_TOKEN_SUCCESS,
    payload: payload
})
export const refreshTokenError = (payload) => ({
    type: authConstants.REFRESH_TOKEN_ERROR,
    payload: payload
})

// Get all users
export const usersLoading = (payload) => ({
    type: userConstants.USER_LOADING,
    payload: payload
})
export const getAllUserAction = (payload) => ({
    type: userConstants.USER_ACTION,
    payload: payload
})
export const getAllUserSuccess = (payload) => ({
    type: userConstants.USER_SUCCESS,
    payload: payload
})
export const getAllUserError = (payload) => ({
    type: userConstants.USER_ERROR,
    payload: payload
})
export const getAllUserReset = () => ({
    type: userConstants.USER_RESET,
})