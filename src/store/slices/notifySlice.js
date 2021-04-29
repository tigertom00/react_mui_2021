import { createSlice } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    status: '',
    statusText: '',
    msg: '',
    show: false,
  },
  reducers: {
    showError: (state, { payload }) => {
      state.show = true;
      state.msg = payload.msg;
      state.status = payload.status;
      state.statusText = payload.statusText;
    },
  },
});

export const { showError } = notifySlice.actions;
export default notifySlice.reducer;
