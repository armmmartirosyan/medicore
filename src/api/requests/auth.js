import axiosClient from './axiosConfig';

function signIn(params) {
  return axiosClient.post('Auth/SignIn', params);
}

function signUp(params) {
  return axiosClient.post('Auth/Register', params).then(data => data.data);
}

function getUserType(name) {
  return axiosClient.get(`Auth/UserType/${name}`).then(data => data.data);
}

export const authRequests = {
  signIn,
  signUp,
  getUserType,
};
