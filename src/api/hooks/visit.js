import {useQuery} from 'react-query';
import {visitRequests} from '../requests';

export const useGetVisits = ({startDate, options}) => {
  return useQuery(
    'get-visits',
    () => visitRequests.getVisits(startDate),
    options,
  );
};

export const useGetVisitById = ({id, options}) => {
  return useQuery(
    'get-visit-by-id',
    () => visitRequests.getVisitById(id),
    options,
  );
};
