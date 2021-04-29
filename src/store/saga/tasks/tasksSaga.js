import { all, takeLeading } from 'redux-saga/effects';
import {
  handleAddTask,
  handleDeleteTask,
  handleGetTasks,
  handleToggleReminder,
} from './handleTasks';
import {
  addTaskServer,
  deleteTaskHandler,
  getTasks,
  toggleReminderReducer,
} from '../../slices/taskSlice';

function* getTasksSaga() {
  yield takeLeading(getTasks, handleGetTasks);
}
function* addTaskSaga() {
  yield takeLeading(addTaskServer, handleAddTask);
}
function* deleteTaskSaga() {
  yield takeLeading(deleteTaskHandler, handleDeleteTask);
}
function* toggleReminderSaga() {
  yield takeLeading(toggleReminderReducer, handleToggleReminder);
}

export default function* tasksSaga() {
  yield all([
    getTasksSaga(),
    addTaskSaga(),
    deleteTaskSaga(),
    toggleReminderSaga(),
  ]);
}
