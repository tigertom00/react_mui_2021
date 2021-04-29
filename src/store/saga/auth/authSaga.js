import { all, takeLeading } from 'redux-saga/effects';
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  signUpHandler,
} from '../../slices/authSlice';
import {
  handleBlacklistToken,
  handleLogin,
  handleRefreshToken,
  handleSignUp,
} from './handleAuth';

function* loginSaga() {
  yield takeLeading(loginHandler, handleLogin);
}
function* refreshTokenSaga() {
  yield takeLeading(refreshTokenHandler, handleRefreshToken);
}
function* blacklistTokenSaga() {
  yield takeLeading(logoutHandler, handleBlacklistToken);
}
function* signUpSaga() {
  yield takeLeading(signUpHandler, handleSignUp);
}

export default function* authSaga() {
  yield all([
    loginSaga(),
    refreshTokenSaga(),
    signUpSaga(),
    blacklistTokenSaga(),
  ]);
}
