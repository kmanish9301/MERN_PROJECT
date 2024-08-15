import { all, fork } from 'redux-saga/effects';
import { authRootSaga } from './authSaga';
import { userRootSaga } from './usersSaga';

export default function* rootSaga() {
    yield all([
        yield all([fork(authRootSaga)])
    ]);
    yield all([
        yield all([fork(userRootSaga)])
    ]);
}
