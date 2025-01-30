import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {useSignIn} from '@screens/sign-in/hooks';
import {Button} from '@components';

export const SignInButton = memo(({email, password}) => {
  const {disableSignIn, handleSignIn} = useSignIn({email, password});

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
