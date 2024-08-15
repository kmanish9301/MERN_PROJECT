import { toggleTheme } from "../action-constants/actionTypes";

const initialState = {
    palette: {
        mode: 'light', // Default mode
        loading: false
    },
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case toggleTheme.TOGGLE_THEME_ACTION:
            return {
                ...state,
                palette: {
                    ...state.palette,
                    mode: action.payload, // Update mode based on action payload
                },
            };
        case toggleTheme.SET_TOGGLE_THEME:
            return {
                ...state,
                palette: {
                    mode: action.payload, // Update with payload
                    loading: false
                },
            };
        default:
            return state;
    }
};

export default themeReducer;
