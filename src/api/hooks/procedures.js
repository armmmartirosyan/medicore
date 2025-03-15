import {useQuery} from 'react-query';
import {procedureRequests} from '../requests';

export const useGetVisitProcedures = ({page, options}) => {
  return useQuery(
    ['get-visit-procedures', page],
    () => procedureRequests.getVisitProcedures(page),
    options,
  );
};

export const useGetVisitProcedureById = ({id, options}) => {
  return useQuery(
    ['get-visit-procedure-by-id', id],
    () => procedureRequests.getVisitProcedureById(id),
    options,
  );
};
