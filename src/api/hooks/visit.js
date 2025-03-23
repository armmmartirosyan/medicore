import {useQuery, useMutation, useQueryClient} from 'react-query';
import {visitRequests} from '../requests';
import {useDispatch} from 'react-redux';
import {resetVisitState} from '@store/visit';

export const useGetVisits = ({id, options}) => {
  return useQuery(
    ['get-visits', id],
    () => visitRequests.getVisits(id),
    options,
  );
};

export const useAddVisit = ({onSuccess, ...rest}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    dispatch(resetVisitState());
    queryClient.invalidateQueries(['get-visits']);
    onSuccess && onSuccess(e);
  };

  return useMutation('add-visit', visitRequests.addVisit, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useEditVisit = ({onSuccess, ...rest}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    dispatch(resetVisitState());
    queryClient.invalidateQueries(['get-visits']);
    onSuccess && onSuccess(e);
  };

  return useMutation('edit-visit', visitRequests.editVisit, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useDeleteVisit = ({onSuccess, ...rest}) => {
  const queryClient = useQueryClient();

  const handleSuccess = e => {
    queryClient.invalidateQueries(['get-visits']);
    onSuccess && onSuccess(e);
  };

  return useMutation('delete-visit', visitRequests.deleteVisit, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useGetVisitById = ({id, options}) => {
  return useQuery(
    ['get-visit-by-id', id],
    () => visitRequests.getVisitById(id),
    options,
  );
};
