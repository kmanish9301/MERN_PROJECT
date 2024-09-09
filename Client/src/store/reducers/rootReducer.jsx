import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import contactUsReducer from "./contactUsReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  contact: contactUsReducer,
});

export default rootReducer;
