import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { productConstants } from "../action-constants/actionTypes";
import {
  getAllProductsError,
  getAllProductsSuccess,
  getProductLoading,
} from "../actions/actions";
import { getAllProductsApi } from "../apis/productApi";

export function* getAllProductsSaga({ payload }) {
  try {
    yield put(getProductLoading(true));
    const data = yield call(getAllProductsApi, payload);
    if (data?.status === 200) {
      yield put(getAllProductsSuccess(data?.data));
      toast.success(data.data.message);
    } else {
      yield put(getAllProductsError(data));
      toast.error(data.message);
    }
    yield put(getProductLoading(false));
  } catch (err) {
    yield put(getAllProductsError(err));
  }
}

export function* productRootSaga() {
  yield takeLatest(productConstants.PRODUCT_ACTION, getAllProductsSaga);
}
