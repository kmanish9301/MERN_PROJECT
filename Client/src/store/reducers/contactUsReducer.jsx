import { contactUsConstants } from "../action-constants/actionTypes";

const initialState = {
  data: {},
  loading: false,
  success: false,
};

const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Contact Us
    case contactUsConstants.CONTACT_ACTION:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case contactUsConstants.CONTACT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      };
    case contactUsConstants.CONTACT_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        data: {},
      };
    case contactUsConstants.CONTACT_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        data: {},
      };
    default:
      return state;
  }
};

export default contactUsReducer;
