import {useMutation, useQuery} from 'react-query';
import {authRequests} from '../requests';

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
