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
    .get(`VisitProcedure/GetById/${id}`)
    .then(data => data?.data);
}

function addVisitProcedure(params) {
  const formData = new FormData();

  formData.append('notes', params.notes);
  formData.append('visitId', params.visitId);
  formData.append('procedureId', params.procedureId);

  params?.images?.forEach(image =>
    formData.append('images', {
      ...image,
      uri: image.uri,
      type: image.type,
      name: image.name || image.fileName || `photo_${Date.now()}.${image.type}`,
    }),
  );

  return axiosClient
    .post('VisitProcedure/Add', formData, {
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

function deleteVisitProcedure(id) {
  return axiosClient
    .delete(`VisitProcedure/Delete/${id}`)
    .then(data => data?.data);
}

function deleteVisitProcedureImage(url) {
  return axiosClient
    .delete(`VisitProcedure/DeleteProcedureImage/${url}`)
    .then(data => data?.data);
}

function visitProcedureUploadImages(params) {
  const formData = new FormData();

  formData.append('visitProcedureId', params.visitProcedureId);

  params?.images?.forEach(image =>
    formData.append('images', {
      ...image,
      uri: image.uri,
      type: image.type,
      name: image.name || image.fileName || `photo_${Date.now()}.${image.type}`,
    }),
  );

  return axiosClient
    .post('VisitProcedure/UploadImages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(data => data?.data);
}

export const procedureRequests = {
  getProcedures,
  getVisitProcedures,
  getVisitProcedureById,
  addVisitProcedure,
  updateVisitProcedure,
  deleteVisitProcedure,
  visitProcedureUploadImages,
  deleteVisitProcedureImage,
};
