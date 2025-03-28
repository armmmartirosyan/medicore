import {useMutation, useQuery} from 'react-query';
import {procedureRequests} from '../requests';

export const useGetVisitProcedures = ({page, options}) => {
  return useQuery(
    ['get-visit-procedures', page],
    () => procedureRequests.getVisitProcedures(page),
    options,
  );
};

export const useGetProcedures = options => {
  return useQuery(['get-procedures'], procedureRequests.getProcedures, options);
};

export const useGetVisitProcedureById = ({id, options}) => {
  return useQuery(
    ['get-visit-procedure-by-id', id],
    () => procedureRequests.getVisitProcedureById(id),
    options,
  );
};

export const useAddVisitProcedure = options => {
  return useMutation(
    ['add-visit-procedure'],
    procedureRequests.addVisitProcedure,
    options,
  );
};

export const useVisitProcedureUploadImages = options => {
  return useMutation(
    ['visit-procedure-upload-images'],
    procedureRequests.visitProcedureUploadImages,
    options,
  );
};

export const useUpdateVisitProcedure = options => {
  return useMutation(
    ['update-visit-procedure'],
    procedureRequests.updateVisitProcedure,
    options,
  );
};

export const useDeleteVisitProcedure = options => {
  return useMutation(
    ['delete-visit-procedure'],
    procedureRequests.deleteVisitProcedure,
    options,
  );
};

export const useDeleteVisitProcedureImage = options => {
  return useMutation(
    ['delete-visit-procedure-image'],
    procedureRequests.deleteVisitProcedureImage,
    options,
  );
};
