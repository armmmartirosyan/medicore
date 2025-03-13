import axiosClient from './axiosConfig';

function getProcedures(page) {
  return axiosClient
    .get('Procedures/GetAll', {params: {page}})
    .then(data => data?.data);
}

function getProcedureById(id) {
  return axiosClient
    .get('Procedures/GetById', {params: {id}})
    .then(data => data?.data);
}

export const procedureRequests = {
  getProcedures,
  getProcedureById,
};
