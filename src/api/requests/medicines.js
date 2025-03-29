import axiosClient from './axiosConfig';

function getMedicines(page) {
  return axiosClient
    .get(`MedicinesAssigned/GetAll/${page}`)
    .then(data => data?.data);
}

function getMedicineById(id) {
  return axiosClient
    .get('MedicinesAssigned/GetById', {params: {id}})
    .then(data => data?.data);
}

function addMedicine(params) {
  return axiosClient
    .post('MedicinesAssigned/Add', params)
    .then(data => data?.data);
}

function deleteMedicine(id) {
  return axiosClient
    .delete(`MedicinesAssigned/Delete/${id}`)
    .then(data => data?.data);
}

export const medicinesRequests = {
  addMedicine,
  getMedicines,
  deleteMedicine,
  getMedicineById,
};
