import axiosInstance from '../../../axios';

export function requestGetTasks() {
  return axiosInstance.get('api/todo');
}

export function requestAddTask(payload) {
  return axiosInstance.post('api/todo/', payload);
}

export function requestDeleteTask(payload) {
  return axiosInstance.delete(`api/todo/${payload}/`);
}

export function requestFetchTask(payload) {
  return axiosInstance.get(`api/todo/${payload}/`);
}

export function requestToggleReminder(payload) {
  return axiosInstance.put(`api/todo/${payload.id}/`, payload);
}
