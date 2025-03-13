import axiosClient from './axiosConfig';

function getVisits(startDate) {
  return axiosClient
    .get('Visit/GetAll', {params: {startDate}})
    .then(data => data?.data);
}

function getVisitById(id) {
  return axiosClient
    .get('Visit/GetById', {params: {id}})
    .then(data => data?.data);
}

export const visitRequests = {
  getVisits,
  getVisitById,
};
