import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { productConstants } from "../action-constants/actionTypes";
import {
  createProductError,
  createProductSuccess,
  deleteProductError,
  deleteProductSuccess,
  getAllProductsError,
  getAllProductsSuccess,
  getProductLoading,
  updateProductError,
  updateProductSuccess,
} from "../actions/actions";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  updateProductApi,
} from "../apis/productApi";

export function* getAllProductsSaga({ payload }) {
  try {
    yield put(getProductLoading(true));
    const data = yield call(getAllProductsApi, payload);
    if (data?.status === 200) {
      yield put(getAllProductsSuccess(data?.data));
      // toast.success(data.data.message);
    } else {
      yield put(getAllProductsError(data));
      // toast.error(data.message);
    }
    yield put(getProductLoading(false));
  } catch (err) {
    yield put(getAllProductsError(err));
  }
}

export function* createProductSaga({ payload }) {
  try {
    yield put(getProductLoading(true));
    const data = yield call(createProductApi, payload);
    if (data?.status === 201) {
      yield put(createProductSuccess(data?.data));
      toast.success(data.data.message);
    } else {
      yield put(createProductError(data));
      toast.error(data.message);
    }
    yield put(getProductLoading(false));
  } catch (err) {
    yield put(createProductError(err));
  }
}

export function* deleteProductSaga({ payload }) {
  try {
    yield put(getProductLoading(true));
    const data = yield call(deleteProductApi, payload);
    if (data?.status === 200) {
      yield put(deleteProductSuccess(data?.data));
      toast.success(data.data.message);
    } else {
      yield put(deleteProductError(data));
      toast.error(data.message);
    }
    yield put(getProductLoading(false));
  } catch (err) {
    yield put(deleteProductError(err));
  }
}

export function* updateProductSaga({ payload }) {
  const { id, formData } = payload;
  try {
    yield put(getProductLoading(true));
    const data = yield call(updateProductApi, id, formData);
    if (data?.status === 200) {
      yield put(updateProductSuccess(data?.data));
      toast.success(data.data.message);
    } else {
      yield put(updateProductError(data));
      toast.error(data.message);
    }
    yield put(getProductLoading(false));
  } catch (err) {
    yield put(updateProductError(err));
  }
}

export function* productRootSaga() {
  yield takeLatest(productConstants.PRODUCT_ACTION, getAllProductsSaga);
  yield takeLatest(productConstants.CREATE_PRODUCT_ACTION, createProductSaga);
  yield takeLatest(productConstants.DELETE_PRODUCT_ACTION, deleteProductSaga);
  yield takeLatest(productConstants.UPDATE_PRODUCT_ACTION, updateProductSaga);
}
