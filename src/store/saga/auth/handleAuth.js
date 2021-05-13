import { call, put } from 'redux-saga/effects';
import {
  getUserHandler,
  loginReducer,
  logoutReducer,
  refreshTokenHandler,
  toggleDarkModeReducer,
  UpdateUserReducer,
} from '../../slices/authSlice';
import { showError } from '../../slices/notifySlice';
import {
  requestAccessToken,
  requestBlacklistToken,
  requestLogin,
  requestSignUP,
  requestUpdateProfilePicture,
  requestUpdateUserData,
  requestUserData,
} from './requestAuth';

export function* handleUpdateProfilePicture({ payload }) {
  try {
    const response = yield call(requestUpdateProfilePicture, payload);
    const { data } = response;

    console.log('data from server: ', data);
  } catch (err) {
    console.log(err.response.message);
  }
}

export function* handleUpdateUser({ payload }) {
  try {
    const response = yield call(requestUpdateUserData, payload);
    const data = response.data;
    localStorage.setItem('user_data', JSON.stringify(data));
    yield put(UpdateUserReducer(data));
  } catch (err) {
    if (err.response.status === 401) {
      console.log('handle add task err', err.response);
      yield put(refreshTokenHandler());
    } else {
      const error = {
        status: err.response.status,
        msg: err.response.data.text,
        statusText: err.response.statusText,
      };
      yield put(showError(error));
      console.log('handle err sent to show error: ', error);
    }
  }
}

export function* handleGetUser() {
  try {
    const response = yield call(requestUserData);
    localStorage.setItem('user_data', JSON.stringify(response.data[0]));
    yield put(refreshTokenHandler());
  } catch (err) {
    if (err.response.status === 401) {
      console.log('handle add task err', err.response);
      yield put(refreshTokenHandler());
    } else {
      const error = {
        status: err.response.status,
        msg: err.response.data.text,
        statusText: err.response.statusText,
      };
      yield put(showError(error));
      console.log('handle err sent to show error: ', error);
    }
  }
}

export function* handleSignUp({ payload }) {
  try {
    const signUpResponse = yield call(requestSignUP, payload);
    const { data } = yield signUpResponse;
    localStorage.setItem('user_data', JSON.stringify(data.user));
    yield put(loginReducer(data));
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* handleLogin({ payload }) {
  try {
    const response = yield call(requestLogin, payload);
    const { data } = response;
    localStorage.setItem('user_data', JSON.stringify(data.user));

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
    if (refreshToken.refresh === null) {
      console.log('refresh Token: ', refreshToken.refresh);
      console.log(
        'no Refresh Token! TODO: REDIRECT TO LOGIN, , from LOGOUT? DISPATCH LOGOUT'
      );
      yield put(logoutReducer());
    } else {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (userData === undefined || null) {
        put(getUserHandler());
      } else {
        const tokenRes = yield call(requestAccessToken, refreshToken);
        const { data } = tokenRes;
        const newData = {
          user: userData,
          refresh_token: data.refresh,
          access_token: data.access,
        };
        yield put(loginReducer(newData));
      }
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
    if (err.response.status === 401) {
      console.log('handle add task err', err.response);
      yield put(refreshTokenHandler());
    } else {
      const error = {
        status: err.response.status,
        msg: err.response.data.text,
        statusText: err.response.statusText,
      };
      yield put(showError(error));
      console.log('handle err sent to show error: ', error);
    }
  }
}
