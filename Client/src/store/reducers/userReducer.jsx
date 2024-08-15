import { userConstants } from "../action-constants/actionTypes"

const initialState = {
    data: [],
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_ACTION:
            return {
                ...state,
                data: [],
                loading: true
            }
        case userConstants.USER_SUCCESS:
            return {
                ...state,
                data: action.payload?.results || [],
                loading: false
            }
        case userConstants.USER_ERROR:
            return {
                ...state,
                data: [],
                loading: false
            }
        default:
            return state
    }
}

export default userReducer;