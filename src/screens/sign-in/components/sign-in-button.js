import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {useSignIn} from '@screens/sign-in/hooks';
import {Button} from '@components';
import {getSize} from '@utils';

export const SignInButton = memo(({email, password}) => {
  const {disableSignIn, handleSignIn, isLoading} = useSignIn({email, password});

  return (
    <Button
      isLoading={isLoading}
      onPress={handleSignIn}
      disabled={disableSignIn}
      style={styles.button}>
      Sign In
    </Button>
  );
});

const styles = StyleSheet.create({
  button: {
    marginBottom: getSize(16),
  },
});
