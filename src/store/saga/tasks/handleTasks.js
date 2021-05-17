import { call, put } from 'redux-saga/effects';
import {
  addTaskReducer,
  deleteTaskReducer,
  setTasksReducer,
  toggleReminderReducer,
} from '../../slices/taskSlice';
import { showNotify } from '../../slices/notifySlice';
import {
  requestAddTask,
  requestDeleteTask,
  requestGetTasks,
  requestToggleReminder,
} from './requestsTasks';

export function* handleGetTasks() {
  try {
    const response = yield call(requestGetTasks);
    const { data } = response;
    yield put(setTasksReducer(data));
  } catch (err) {
    yield put(showNotify(err.response));
    console.log('handle err sent to show error: ', err);
  }
}

export function* handleAddTask({ payload }) {
  try {
    const response = yield call(requestAddTask, payload);
    const { data } = response;
    yield put(addTaskReducer(data));
  } catch (err) {
    yield put(showNotify(err.response));
    console.log('handle err sent to show error: ', err);
  }
}

export function* handleDeleteTask({ payload }) {
  try {
    yield call(requestDeleteTask, payload);
    yield put(deleteTaskReducer(payload));
  } catch (err) {
    yield put(showNotify(err.response));
    console.log('handle err sent to show error: ', err);
  }
}

export function* handleToggleReminder({ payload }) {
  try {
    yield call(requestToggleReminder, payload);
    put(toggleReminderReducer(payload));
  } catch (err) {
    yield put(showNotify(err.response));
    console.log('handle err sent to show error: ', err);
  }
}
