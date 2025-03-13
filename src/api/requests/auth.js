import axiosClient from './axiosConfig';

function signIn(params) {
  return axiosClient.post('Auth/SignIn', params);
}

function signUp(params) {
  return axiosClient.post('Auth/Register', params).then(data => data?.data);
}

function getUserType(name) {
  return axiosClient.get(`Auth/UserType/${name}`).then(data => data?.data);
}

function getUserProfile() {
  return axiosClient.get('Auth/UserProfile').then(data => data?.data);
}

function updateProfile(params) {
  return axiosClient.put('Auth/UserProfile', params).then(data => data?.data);
}

function updateProfileImage(params) {
  return axiosClient
    .put('Auth/ProfileImage', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(data => data?.data);
}

function changeProfilePassword(params) {
  return axiosClient
    .put('Auth/ChangePassword', params)
    .then(data => data?.data);
}

function deleteProfileImage() {
  return axiosClient.delete('Auth/ProfileImage').then(data => data?.data);
}

function getDoctors(page) {
  return axiosClient
    .get('Auth/Doctors', {params: {page}})
    .then(data => data?.data);
}

export const authRequests = {
  signIn,
  signUp,
  getUserType,
  getUserProfile,
  updateProfile,
  updateProfileImage,
  deleteProfileImage,
  changeProfilePassword,
  getDoctors,
};
