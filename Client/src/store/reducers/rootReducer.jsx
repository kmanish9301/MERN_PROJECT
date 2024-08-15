import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    user: userReducer
})

export default rootReducer;