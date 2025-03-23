import axiosClient from './axiosConfig';

function getVisits(id) {
  return axiosClient.get(`Visit/GetAll/${id}`).then(data => data?.data);
}

function getVisitById(id) {
  return axiosClient
    .get('Visit/GetById', {params: {id}})
    .then(data => data?.data);
}

function addVisit(params) {
  return axiosClient.post('Visit/Add', params).then(data => data?.data);
}

function editVisit({id, ...rest}) {
  return axiosClient
    .put(`Visit/Update/${id}`, {...rest})
    .then(data => data?.data);
}

function deleteVisit(id) {
  return axiosClient.delete(`Visit/Delete/${id}`).then(data => data?.data);
}

export const visitRequests = {
  getVisits,
  getVisitById,
  addVisit,
  editVisit,
  deleteVisit,
};
