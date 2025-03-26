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

export const useUpdateVisitProcedure = options => {
  return useMutation(
    ['update-visit-procedure'],
    procedureRequests.updateVisitProcedure,
    options,
  );
};
