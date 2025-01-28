import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useAuthSignIn} from '@api-hooks';
import {Button} from '@components';
import {useAuth} from '@contexts';

export const SignInButton = memo(({email, password, disableSignIn}) => {
  const {signIn} = useAuth();

  const {mutate: sendCredentials} = useAuthSignIn();

  const onSuccess = () => {
    console.log('onSuccess');

    const TOKEN_FROM_ARGS = 'token';
    signIn(TOKEN_FROM_ARGS);
  };

  const onError = () => {
    console.log('onError');
  };

  const handleSignIn = useCallback(() => {
    if (disableSignIn) {
      return;
    }

    sendCredentials(
      {email, password},
      {
        onSuccess,
        onError: onSuccess,
      },
    );
  }, [disableSignIn, sendCredentials, email, password]);

  return (
    <Button
      onPress={handleSignIn}
      disabled={disableSignIn}
      style={styles.button}>
      Sign In
    </Button>
  );
});

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
  },
});
