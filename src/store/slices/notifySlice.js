import { createSlice } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    status: '',
    statusFist: '',
    statusText: '',
    msg: '',
  },
  reducers: {
    showNotifyJSON: (state, { payload }) => {
      const newPayload = JSON.parse(payload);
      console.log('payload: ', newPayload);
      state.status = newPayload.status;
      state.statusText = newPayload.statusText;
      state.statusFirst = ('' + newPayload.status)[0];
      // * Checks for type of msg
      if (newPayload.data.text !== undefined) {
        state.msg = newPayload.data.text;
      } else if (newPayload.data.non_field_errors[0] !== undefined) {
        state.msg = newPayload.data.non_field_errors[0];
      } else {
        state.msg = 'No Text Received, Check Console-log';
        console.log('payload: ', newPayload);
      }
    },
    showNotify: (state, { payload }) => {
      console.log('payload: ', payload);
      state.status = payload.status;
      state.statusText = payload.statusText;
      state.statusFirst = ('' + payload.status)[0];
      state.msg = payload.msg;
    },
    clearNotify: (state) => {
      state.msg = '';
      state.statusText = '';
      state.status = '';
      state.statusFirst = '';
    },
  },
});

export const { showNotify, clearNotify, showNotifyJSON } = notifySlice.actions;
export default notifySlice.reducer;
