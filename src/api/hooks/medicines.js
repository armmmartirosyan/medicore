import {useQuery} from 'react-query';
import {medicinesRequests} from '../requests';

export const useGetMedicinesAssigned = ({page, options}) => {
  return useQuery(
    'get-medicines-assigned',
    () => medicinesRequests.getMedicines(page),
    options,
  );
};

export const useGetMedicinesAssignedById = ({id, options}) => {
  return useQuery(
    'get-medicines-assigned-by-id',
    () => medicinesRequests.getMedicineById(id),
    options,
  );
};
