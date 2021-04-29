import axiosInstance from '../../../axios';

// export function requestLogin(payload) {
//   return axiosInstance.post('api/token/', payload);
// }
export function requestLogin(payload) {
  return axiosInstance.post('dj-rest-auth/login/', payload);
}

export function requestUserData() {
  return axiosInstance.get('api/users/');
}

export function requestAccessToken(refreshToken) {
  return axiosInstance.post('api/users/token/refresh/', refreshToken);
}

export function requestSignUP(payload) {
  return axiosInstance.post('dj-rest-auth/registration/', payload);
}

export function requestBlacklistToken(payload) {
  return axiosInstance.post('api/users/logout/blacklist/', payload);
}
