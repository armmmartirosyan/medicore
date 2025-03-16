import {useQuery} from 'react-query';
import {visitRequests} from '../requests';

export const useGetVisits = ({options}) => {
  return useQuery('get-visits', () => visitRequests.getVisits(), options);
};

export const useGetVisitById = ({id, options}) => {
  return useQuery(
    ['get-visit-by-id', id],
    () => visitRequests.getVisitById(id),
    options,
  );
};
