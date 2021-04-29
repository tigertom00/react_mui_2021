import { call, put } from 'redux-saga/effects';
import {
  addTaskReducer,
  deleteTaskReducer,
  setTasksReducer,
  toggleReminderReducer,
} from '../../slices/taskSlice';
import { showError } from '../../slices/notifySlice';
import {
  requestAddTask,
  requestDeleteTask,
  requestGetTasks,
  requestToggleReminder,
} from './requestsTasks';
import { refreshTokenHandler } from '../../slices/authSlice';

export function* handleGetTasks() {
  try {
    const response = yield call(requestGetTasks);
    const { data } = response;
    yield put(setTasksReducer(data));
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

export function* handleAddTask({ payload }) {
  try {
    const response = yield call(requestAddTask, payload);
    const { data } = response;
    yield put(addTaskReducer(data));
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

export function* handleDeleteTask({ payload }) {
  try {
    yield call(requestDeleteTask, payload);
    yield put(deleteTaskReducer(payload));
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

export function* handleToggleReminder({ payload }) {
  try {
    yield call(requestToggleReminder, payload);
    put(toggleReminderReducer(payload));
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
