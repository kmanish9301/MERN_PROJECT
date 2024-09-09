import { all, fork } from "redux-saga/effects";
import { authRootSaga } from "./authSaga";
import { productRootSaga } from "./productsSaga";
import { userRootSaga } from "./usersSaga";
import { contactUsRootSaga } from "./contactUsSaga";

export default function* rootSaga() {
  yield all([yield all([fork(authRootSaga)])]);
  yield all([yield all([fork(userRootSaga)])]);
  yield all([yield all([fork(productRootSaga)])]);
  yield all([yield all([fork(contactUsRootSaga)])]);
}
