import { createMuiTheme } from '@material-ui/core';
import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
  },
  reducers: {
    darkModeHandler: (state) => {
      state.darkMode = !state.darkMode;
    },
    darkModeState: (state) =>
      createMuiTheme({
        palette: {
          type: state.darkMode ? 'dark' : 'light',
          primary: {
            main: '#C04FC4',
          },
        },
      }),
  },
});

export const { darkModeHandler, darkModeState } = settingsSlice.actions;
export default settingsSlice.reducer;
