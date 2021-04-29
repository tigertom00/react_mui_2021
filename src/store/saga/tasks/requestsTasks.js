import axiosInstance from '../../../axios';

export function requestGetTasks() {
  return axiosInstance.get('api/testing');
}

export function requestAddTask(payload) {
  return axiosInstance.post('api/testing/', payload);
}

export function requestDeleteTask(payload) {
  return axiosInstance.delete(`api/testing/${payload}/`);
}

export function requestFetchTask(payload) {
  return axiosInstance.get(`api/testing/${payload}/`);
}

export function requestToggleReminder(payload) {
  return axiosInstance.put(`api/testing/${payload.id}/`, payload);
}
