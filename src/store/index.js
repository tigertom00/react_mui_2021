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

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
  notify: notifyReducer,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export default store;
