import axiosClient from './axiosConfig';

function getByDoctorId(id) {
  return axiosClient
    .get(`WeekDaySchedule/GetByDoctorId/${id}`)
    .then(data => data?.data);
}

function add(params) {
  return axiosClient
    .post('WeekDaySchedule/Create', params)
    .then(data => data?.data);
}

function update({id, ...rest}) {
  return axiosClient
    .put(`WeekDaySchedule/Update/${id}`, {...rest})
    .then(data => data?.data);
}

function remove(id) {
  return axiosClient
    .delete(`WeekDaySchedule/Delete/${id}`)
    .then(data => data?.data);
}

export const weekDaysRequests = {
  getByDoctorId,
  add,
  update,
  remove,
};
