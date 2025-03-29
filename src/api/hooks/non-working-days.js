import {useQuery, useMutation, useQueryClient} from 'react-query';
import {nonWorkingDaysRequests} from '../requests';

export const useGetMyNonWorkings = options => {
  return useQuery(
    ['get-my-non-workings'],
    nonWorkingDaysRequests.getMyNonWorkings,
    options,
  );
};

export const useAddNonWorking = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-my-non-workings']);
    onSuccess && onSuccess(e);
  };

  return useMutation('add-non-working', nonWorkingDaysRequests.addNonWorking, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useDeleteNonWorking = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-my-non-workings']);
    onSuccess && onSuccess(e);
  };

  return useMutation(
    'delete-non-working',
    nonWorkingDaysRequests.deleteNonWorking,
    {
      onSuccess: handleSuccess,
      ...rest,
    },
  );
};
