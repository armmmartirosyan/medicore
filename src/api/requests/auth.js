import axiosClient from './axiosConfig';

function signIn(params) {
  return axiosClient.post('sign-in', params);
}

function signUp(params) {
  return axiosClient.post('sign-up', params);
}

export const authRequests = {
  signIn,
  signUp,
};
