import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { contactUsConstants } from "../action-constants/actionTypes";
import {
  contactUsError,
  contactUsLoading,
  contactUsSuccess,
} from "../actions/actions";
import { contactUsApi } from "../apis/contactUsApi";

export function* contactUsSaga({ payload }) {
  try {
    yield put(contactUsLoading(true));
    const data = yield call(contactUsApi, payload);
    if (data?.status === 201) {
      yield put(contactUsSuccess(data));
      toast.success(data.data.message);
    } else {
      yield put(contactUsError(data));
      toast.success(data.data.message);
    }
    yield put(contactUsLoading(false));
  } catch (err) {
    yield put(contactUsError(err));
  }
}

export function* contactUsRootSaga() {
  yield takeLatest(contactUsConstants.CONTACT_ACTION, contactUsSaga);
}
