import { productConstants } from "../action-constants/actionTypes";

const initialState = {
  data: [],
  loading: false,
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
    default:
      return state;
  }
};

export default productReducer;
