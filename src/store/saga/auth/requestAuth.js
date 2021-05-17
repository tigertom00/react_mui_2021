import axiosInstance from '../../../axios';

// export function requestLogin(payload) {
//   return axiosInstance.post('api/token/', payload);
// }

export function requestUserData() {
  return axiosInstance.get('api/users/');
}

export function requestUpdateUserData(payload) {
  return axiosInstance.patch(`api/users/${payload.id}/`, payload);
}

export function requestUpdateProfilePicture(payload) {
  return axiosInstance.post(`api/users/upload/${payload.id}/`, payload);
}

export function requestLogin(payload) {
  return axiosInstance.post('dj-rest-auth/login/', payload);
}

export function requestSignUP(payload) {
  return axiosInstance.post('dj-rest-auth/registration/', payload);
}

export function requestAccessToken(refreshToken) {
  return axiosInstance.post('api/utils/token/refresh/', refreshToken);
}

export function requestBlacklistToken(payload) {
  return axiosInstance.post('api/utils/token/blacklist/', payload);
}
