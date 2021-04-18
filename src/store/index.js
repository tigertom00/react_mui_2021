import { configureStore, combineReducers } from '@reduxjs/toolkit';

import taskReducer from './taskSlice';

const reducer = combineReducers({
  tasks: taskReducer,
});
export default configureStore({
  reducer,
});
