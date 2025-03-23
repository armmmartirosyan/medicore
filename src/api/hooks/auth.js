import {useMutation, useQuery} from 'react-query';
import {authRequests} from '../requests';
import {useDispatch} from 'react-redux';
import {changeProfileState} from '@store/profile';

export const useAuthSignIn = options => {
  return useMutation('auth-sign-in', authRequests.signIn, options);
};

export const useAuthSignUp = options => {
  return useMutation('auth-sign-up', authRequests.signUp, options);
};

export const useGetUserType = ({name, options}) => {
  return useQuery(
    'get-user-type',
    () => authRequests.getUserType(name),
    options,
  );
};

export const useGetProfileInfo = options => {
  const dispatch = useDispatch();

  const onSuccess = e => {
    const phoneCode = `${e?.data?.phone}`.slice(0, 4);
    const phoneNumber = e?.data?.phone.slice(4);

    dispatch(
      changeProfileState({
        ...e?.data,
        phoneCode,
        phoneNumber,
      }),
    );
  };

  return useQuery('get-profile-info', authRequests.getUserProfile, {
    onSuccess,
    ...options,
  });
};

export const useUpdateProfile = options => {
  return useMutation(
    'auth-update-profile',
    authRequests.updateProfile,
    options,
  );
};

export const useUpdateProfileImage = ({onSuccess, ...rest}) => {
  const dispatch = useDispatch();

  const handleSuccess = e => {
    dispatch(
      changeProfileState({
        imageUrl: e?.data,
      }),
    );

    onSuccess(e);
  };

  return useMutation('update-profile-image', authRequests.updateProfileImage, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useDeleteProfileImage = ({onSuccess, ...rest}) => {
  const dispatch = useDispatch();

  const handleSuccess = e => {
    dispatch(
      changeProfileState({
        imageUrl: '',
      }),
    );

    onSuccess(e);
  };

  return useMutation('delete-profile-image', authRequests.deleteProfileImage, {
    onSuccess: handleSuccess,
    ...rest,
  });
};

export const useChangeProfilePassword = options => {
  return useMutation(
    'change-profile-password',
    authRequests.changeProfilePassword,
    options,
  );
};

export const useGetDoctors = ({page, options}) => {
  return useQuery(
    ['get-doctors', page],
    () => authRequests.getDoctors(page),
    options,
  );
};
