import axiosClient from './axiosConfig';

function getProcedures() {
  return axiosClient.get('Procedures/GetAll').then(data => data?.data);
}

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

function addVisitProcedure(params) {
  return axiosClient
    .post('VisitProcedure/Add', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(data => data?.data);
}

function updateVisitProcedure({id, ...rest}) {
  return axiosClient
    .put(`VisitProcedure/Update/${id}`, {...rest})
    .then(data => data?.data);
}

export const procedureRequests = {
  getProcedures,
  getVisitProcedures,
  getVisitProcedureById,
  addVisitProcedure,
  updateVisitProcedure,
};
