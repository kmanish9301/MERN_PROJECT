import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { authConstants } from "../action-constants/actionTypes";
import {
  authLoading,
  loginError,
  loginSuccess,
  refreshTokenError,
  refreshTokenSuccess,
  registerError,
  registerSuccess,
} from "../actions/actions";
import { loginApi, refreshTokenApi, registerApi } from "../apis/authApi";

export function* registerAuthSaga({ payload }) {
  try {
    yield put(authLoading(true));
    const data = yield call(registerApi, payload);
    if (data?.status === 201) {
      yield put(registerSuccess(data.data.success));
      toast.success(data.data.message);
    } else {
      yield put(registerError(data));
      toast.error(data.message);
    }
    yield put(authLoading(false));
  } catch (err) {
    yield put(registerError(err));
  }
}

export function* loginAuthSaga({ payload }) {
  try {
    yield put(authLoading(true));
    const data = yield call(loginApi, payload);
    if (data?.status === 200) {
      yield put(loginSuccess(data));
      toast.success(data.data.message);
    } else {
      yield put(loginError(data));
      toast.error(data.message);
    }
    yield put(authLoading(false));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* refreshTokenAuthSaga({ payload }) {
  try {
    yield put(authLoading(true));
    const data = yield call(refreshTokenApi, payload);
    if (data?.status === 200) {
      yield put(refreshTokenSuccess(data));
    } else {
      yield put(refreshTokenError(data));
    }
    yield put(authLoading(false));
  } catch (err) {
    yield put(refreshTokenError(err));
  }
}

export function* authRootSaga() {
  yield takeLatest(authConstants.REGISTER_ACTION, registerAuthSaga);
  yield takeLatest(authConstants.LOGIN_ACTION, loginAuthSaga);
  yield takeLatest(authConstants.REFRESH_TOKEN_ACTION, refreshTokenAuthSaga);
}
