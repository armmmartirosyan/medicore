import axiosClient from './axiosConfig';

function getMyNonWorkings() {
  return axiosClient
    .get('NotWorkingDate/GetByDoctorId')
    .then(data => data?.data);
}

function addNonWorking(params) {
  return axiosClient
    .post('NotWorkingDate/Create', params)
    .then(data => data?.data);
}

function deleteNonWorking(id) {
  return axiosClient
    .delete(`NotWorkingDate/Delete/${id}`)
    .then(data => data?.data);
}

export const nonWorkingDaysRequests = {
  getMyNonWorkings,
  addNonWorking,
  deleteNonWorking,
};
