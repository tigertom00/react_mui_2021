import { all } from 'redux-saga/effects';
import tasksSaga from '../saga/tasks/tasksSaga';
import authSaga from './auth/authSaga';

export function* watcherSaga() {
  yield all([tasksSaga(), authSaga()]);
}
