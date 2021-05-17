import { createSlice } from '@reduxjs/toolkit';
import { showNotify, showNotifyJSON } from './notifySlice';
import axiosInstance from '../../axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {
      dark_mode: false,
    },
    tokens: {
      refresh_token: null,
      access_token: null,
      // refresh: localStorage.getItem('refresh_token'),
      // access: localStorage.getItem('access_token'),
    },
  },

  reducers: {
    // toggleDarkModeHandler: (state, {payload}) => {
    //   state.user.dark_mode = payload.dark_mode
    // },

    updateProfilePictureHandler: (state) => {},
    UpdateUserHandler: (state, { payload }) => {
      console.log('payload: ', payload);
      state.isLoading = true;
    },
    UpdateUserReducer: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    toggleDarkModeHandler: {
      reducer: (state, { payload }) => {
        state.user.dark_mode = payload.dark_mode;
      },
      prepare: (value) => {
        return {
          payload: {
            ...value,
            dark_mode: !value.dark_mode,
          },
        };
      },
    },
    getUserHandler: (state) => {
      state.isLoading = true;
    },

    signUpHandler: (state) => {
      state.isLoading = true;
    },
    refreshTokenHandler: (state) => {
      state.isLoading = true;
    },
    birthdayUpdateHandler: (state, { payload }) => {
      state.user.date_of_birth = payload;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = { dark_mode: false };
      state.tokens.refresh_token = null;
      state.tokens.access_token = null;

      return state;
    },
    logoutHandler: (state, { payload }) => {
      state.isLoading = true;
    },
    logoutReducer: (state, { payload }) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = { dark_mode: false };
      state.tokens.refresh_token = null;
      state.tokens.access_token = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      axiosInstance.defaults.headers['Authorization'] = null;
    },
    loginHandler: (state) => {
      state.isLoading = true;
    },
    loginReducer: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.user.dark_mode = payload.user.dark_mode;
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
    builder.addCase(showNotify, (state) => {
      state.isLoading = false;
    });
    builder.addCase(showNotifyJSON, (state) => {
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
  birthdayUpdateHandler,
  updateProfilePictureHandler,
  UpdateUserReducer,
  toggleDarkModeHandler,
  UpdateUserHandler,
  getUserHandler,
  logoutHandler,
  logoutReducer,
  loginReducer,
  loginHandler,
  clearAuthState,
  refreshTokenHandler,
  signUpHandler,
} = authSlice.actions;
export default authSlice.reducer;
