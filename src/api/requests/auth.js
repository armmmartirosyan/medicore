import axiosClient from './axiosConfig';

function signIn(params) {
  return axiosClient.post('sign-in', params);
}

export const authRequests = {
  signIn,
};
