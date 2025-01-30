import {useCallback, useMemo} from 'react';
import {isValidEmail, isSecurePassword} from '@utils';
import {useAuthSignIn} from '@api-hooks';
import {useAuth} from '@contexts';

export function useSignIn({email, password}) {
  const onSuccess = useCallback(() => {
    console.log('onSuccess');

    const TOKEN_FROM_ARGS = 'token';
    signIn(TOKEN_FROM_ARGS);
  }, [signIn]);

  const onError = useCallback(() => {
    console.log('onError');
  }, []);

  const {signIn} = useAuth();
  const {mutate: sendCredentials} = useAuthSignIn({
    onError: onSuccess,
    onSuccess,
  });

  const disableSignIn = useMemo(() => {
    return !isValidEmail(email) || !isSecurePassword(password);
  }, [email, password]);

  const handleSignIn = useCallback(() => {
    if (disableSignIn) {
      return;
    }

    sendCredentials({email, password});
  }, [disableSignIn, sendCredentials, email, password]);

  return {
    disableSignIn,
    handleSignIn,
  };
}
