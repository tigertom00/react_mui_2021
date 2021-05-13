import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './saga/rootSaga';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';
import notifyReducer from './slices/notifySlice';
import settingsReducer from './slices/settingsSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export default store;
