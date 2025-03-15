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

export const medicinesRequests = {
  getMedicines,
  getMedicineById,
};
