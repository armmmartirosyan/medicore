import {useMutation} from 'react-query';
import {authRequests} from '../requests';

export const useAuthSignIn = options => {
  return useMutation('auth-sign-in', authRequests.signIn, options);
};

export const useAuthSignUp = options => {
  return useMutation('auth-sign-up', authRequests.signUp, options);
};
