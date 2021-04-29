import { call, put } from 'redux-saga/effects';
import { loginReducer, logoutReducer } from '../../slices/authSlice';
import { showError } from '../../slices/notifySlice';
import {
  requestAccessToken,
  requestBlacklistToken,
  requestLogin,
  requestSignUP,
} from './requestAuth';

export function* handleSignUp({ payload }) {
  try {
    const signUpResponse = yield call(requestSignUP, payload);
    const { data } = yield signUpResponse;
    console.log('signUpData:', data);
    yield put(loginReducer(data));
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* handleLogin({ payload }) {
  try {
    const response = yield call(requestLogin, payload);
    const { data } = response;
    console.log('LoginData: ', data);
    yield put(loginReducer(data));
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* handleRefreshToken() {
  try {
    const refreshToken = {
      refresh: localStorage.getItem('refresh_token'),
    };
    console.log('refreshToken to server: ', refreshToken);
    if (refreshToken.refresh === null) {
      console.log('refresh Token: ', refreshToken.refresh);
      console.log(
        'no Refresh Token! TODO: REDIRECT TO LOGIN, , from LOGOUT? DISPATCH LOGOUT'
      );
      yield put(logoutReducer());
    } else {
      const tokenRes = yield call(requestAccessToken, refreshToken);
      const { data } = tokenRes;
      console.log('Refresh Tokens data: ', data);
      yield put(loginReducer(data));
    }
  } catch (err) {
    console.log('error: ', err.response.data);
    if (err.response.data.code === 'token_not_valid') {
      console.log(
        'token not valid: TODO: REDIRECT TO LOGIN, from LOGOUT?, DISPATCH LOGOUT'
      );
      yield put(logoutReducer());
    } else {
      console.log('sent to showError ', err.response.data);
      yield put(showError(err.response.data));
    }
  }
}

export function* handleBlacklistToken() {
  try {
    const refreshToken = {
      refresh_token: localStorage.getItem('refresh_token'),
    };
    console.log('refresh token: ', refreshToken);
    const response = yield call(requestBlacklistToken, refreshToken);
    console.log('response from delete: ', response);
    yield put(logoutReducer());
  } catch (err) {
    console.log(err.response.data);
  }
}
