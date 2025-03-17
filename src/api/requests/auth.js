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
  return axiosClient.get('Auth/GetProfile').then(data => data?.data);
}

function updateProfile(params) {
  return axiosClient.put('Auth/UpdateProfile', params).then(data => data?.data);
}

function updateProfileImage(image) {
  const formData = new FormData();

  formData.append('image', {
    ...image,
    uri: image.uri,
    type: image.type,
    name: image.name || image.fileName || `photo_${Date.now()}.${image.type}`,
  });

  return axiosClient
    .post('Auth/UploadImage', formData, {
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
  return axiosClient.delete('Auth/DeleteImage').then(data => data?.data);
}

function getDoctors(page) {
  return axiosClient.get(`Auth/Doctors/${page}`).then(data => data?.data);
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
