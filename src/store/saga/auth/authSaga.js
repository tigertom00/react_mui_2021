import { all, takeLeading } from 'redux-saga/effects';
import {
  getUserHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  signUpHandler,
  toggleDarkModeHandler,
  updateProfilePictureHandler,
  UpdateUserHandler,
} from '../../slices/authSlice';
import {
  handleBlacklistToken,
  handleGetUser,
  handleLogin,
  handleRefreshToken,
  handleSignUp,
  handleUpdateProfilePicture,
  handleUpdateUser,
} from './handleAuth';

function* UpdateProfilePictureSaga() {
  yield takeLeading(updateProfilePictureHandler, handleUpdateProfilePicture);
}
function* UpdateUserSaga() {
  yield takeLeading(UpdateUserHandler, handleUpdateUser);
}
function* getUserSaga() {
  yield takeLeading(getUserHandler, handleGetUser);
}
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
function* toggleDarkModeSaga() {
  yield takeLeading(toggleDarkModeHandler, handleUpdateUser);
}

export default function* authSaga() {
  yield all([
    UpdateProfilePictureSaga(),
    UpdateUserSaga(),
    toggleDarkModeSaga(),
    getUserSaga(),
    loginSaga(),
    refreshTokenSaga(),
    signUpSaga(),
    blacklistTokenSaga(),
  ]);
}
