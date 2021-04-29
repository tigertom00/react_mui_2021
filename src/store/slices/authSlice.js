import { createSlice } from '@reduxjs/toolkit';
import { showError } from './notifySlice';
import axiosInstance from '../../axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    tokens: {
      refresh_token: null,
      access_token: null,
      // refresh: localStorage.getItem('refresh_token'),
      // access: localStorage.getItem('access_token'),
    },
  },
  reducers: {
    signUpHandler: (state) => {
      state.isLoading = true;
    },
    refreshTokenHandler: (state) => {
      state.isLoading = true;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.tokens.refresh_token = null;
      state.tokens.access_token = null;

      return state;
    },
    logoutHandler: (state, { payload }) => {
      state.isLoading = true;
    },
    logoutReducer: (state, { payload }) => {
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      state.isLoading = false;
      state.user = null;
      state.tokens.refresh_token = null;
      state.tokens.access_token = null;
    },
    loginHandler: (state) => {
      state.isLoading = true;
    },
    loginReducer: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.tokens.refresh_token = payload.refresh_token;
      state.tokens.access_token = payload.access_token;
      localStorage.setItem('access_token', payload.access_token);
      localStorage.setItem('refresh_token', payload.refresh_token);
      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token');
      console.log('Logged In!');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showError, (state) => {
      state.isLoading = false;
    });
  },
  // extraReducers: {
  //   [handleLogin.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [handleLogin.rejected]: (state, { payload }) => {
  //     console.log('handleLogin failed: ', payload);
  //   },
  //   [handleLogin.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     state.isAuthenticated = true;
  //     state.token.refresh = payload.refresh;
  //     state.token.access = payload.access;
  //   },
  // },
});

export const {
  logoutHandler,
  logoutReducer,
  loginReducer,
  loginHandler,
  clearAuthState,
  refreshTokenHandler,
  signUpHandler,
} = authSlice.actions;
export default authSlice.reducer;
