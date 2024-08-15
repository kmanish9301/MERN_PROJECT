import { authConstants } from "../action-constants/actionTypes";

const initialState = {
    loginDetails: {},
    loading: false,
    success: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.REGISTER_ACTION:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case authConstants.REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
            };

        // Login
        case authConstants.LOGIN_ACTION:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loginDetails: action.payload,
                loading: false,
                success: true,
            };
        case authConstants.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                loginDetails: {},
            };
        case authConstants.RESET_LOGIN:
            return {
                ...state,
                loading: false,
                success: false,
                loginDetails: {},
            };
        default:
            return state;
    }
};

export default authReducer;
