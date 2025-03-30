import {useQuery, useMutation, useQueryClient} from 'react-query';
import {weekDaysRequests} from '../requests';

export const useGetWeekDays = ({id, options}) => {
  return useQuery(
    ['get-week-days', id],
    () => weekDaysRequests.getByDoctorId(id),
    options,
  );
};

export const useAddWeekDay = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-week-days']);
    onSuccess && onSuccess(e);
  };

  return useMutation('add-week-day', weekDaysRequests.add, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useUpdateWeekDay = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-week-days']);
    onSuccess && onSuccess(e);
  };

  return useMutation('update-week-day', weekDaysRequests.update, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useRemoveWeekDay = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-week-days']);
    onSuccess && onSuccess(e);
  };

  return useMutation('remove-week-day', weekDaysRequests.remove, {
    onSuccess: handleSuccess,
    ...rest,
  });
};
