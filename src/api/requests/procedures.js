import axiosClient from './axiosConfig';

function getVisitProcedures(page) {
  return axiosClient
    .get(`VisitProcedure/GetAll/${page}`)
    .then(data => data?.data);
}

function getVisitProcedureById(id) {
  return axiosClient
    .get('VisitProcedure/GetById', {params: {id}})
    .then(data => data?.data);
}

export const procedureRequests = {
  getVisitProcedures,
  getVisitProcedureById,
};
