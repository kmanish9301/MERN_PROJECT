import { productConstants } from "../action-constants/actionTypes";

const initialState = {
  data: [],
  loading: false,
  success: false,
  productData: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_ACTION:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case productConstants.PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload?.results || [],
        loading: false,
      };
    case productConstants.PRODUCT_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
      };

    case productConstants.CREATE_PRODUCT_ACTION:
      return {
        ...state,
        productData: {},
        loading: true,
        success: false,
      };
    case productConstants.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productData: action.payload?.results || {},
        loading: false,
        success: true,
      };
    case productConstants.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        productData: {},
        loading: false,
        success: false,
      };
    case productConstants.CREATE_PRODUCT_RESET:
      return {
        ...state,
        productData: {},
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default productReducer;
