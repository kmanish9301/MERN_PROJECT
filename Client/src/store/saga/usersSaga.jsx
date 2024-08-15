import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { userConstants } from "../action-constants/actionTypes";
import { getAllUserError, getAllUserSuccess, usersLoading } from "../actions/actions";
import { getAllUsersApi } from './../apis/userApi';

export function* getAllUsersSaga({ payload }) {
    try {
        yield put(usersLoading(true));
        const data = yield call(getAllUsersApi, payload);
        if (data?.status === 200) {
            yield put(getAllUserSuccess(data?.data));
            toast.success(data.data.message);
        } else {
            yield put(getAllUserError(data));
            toast.error(data.message);
        }
        yield put(usersLoading(false));
    } catch (err) {
        yield put(getAllUserError(err));
    }
}

export function* userRootSaga() {
    yield takeLatest(
        userConstants.USER_ACTION,
        getAllUsersSaga
    );
}