import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuth} from '@contexts';
import {useAuthSignIn} from '@api-hooks';

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
    <TouchableOpacity
      onPress={handleSignIn}
      disabled={disableSignIn}
      style={styles.loginButton}>
      <Text style={styles.loginButtonText}>Sign in</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#4A90E2',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
