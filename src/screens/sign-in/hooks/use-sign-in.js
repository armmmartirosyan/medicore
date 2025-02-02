import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useCallback, useMemo} from 'react';
import {isValidEmail, isSecurePassword} from '@utils';
import {useAuthSignIn} from '@api-hooks';
import {useAuth} from '@contexts';

export function useSignIn({email, password}) {
  const onSuccess = useCallback(
    data => {
      const token = data?.data?.data;

      if (!token) {
        Toast.show({
          autoClose: 2000,
          title: 'Error',
          type: ALERT_TYPE.DANGER,
          textBody: 'Something went wrong!',
        });

        return;
      }

      signIn(token);
    },
    [signIn],
  );

  const onError = useCallback(() => {
    Toast.show({
      autoClose: 2000,
      title: 'Error',
      type: ALERT_TYPE.DANGER,
      textBody: 'Invalid email or password.',
    });
  }, []);

  const {signIn} = useAuth();
  const {mutate: sendCredentials, isLoading} = useAuthSignIn({
    onError,
    onSuccess,
  });

  const disableSignIn = useMemo(() => {
    return !isValidEmail(email) || !isSecurePassword(password) || isLoading;
  }, [email, password, isLoading]);

  const handleSignIn = useCallback(() => {
    if (disableSignIn) {
      return;
    }

    sendCredentials({email, password});
  }, [disableSignIn, sendCredentials, email, password]);

  return {
    disableSignIn,
    handleSignIn,
    isLoading,
  };
}
