import {useQuery} from 'react-query';
import {procedureRequests} from '../requests';

export const useGetProcedures = ({page, options}) => {
  return useQuery(
    'get-procedures',
    () => procedureRequests.getProcedures(page),
    options,
  );
};

export const useGetProcedureById = ({id, options}) => {
  return useQuery(
    'get-procedure-by-id',
    () => procedureRequests.getProcedureById(id),
    options,
  );
};
