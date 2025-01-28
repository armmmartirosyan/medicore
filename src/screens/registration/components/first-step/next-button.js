import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {useFirstStepDisabled} from '@screens/registration/hooks';

export function NextButton({onNextStep}) {
  const disabled = useFirstStepDisabled();

  return (
    <Pressable style={styles.button} onPress={onNextStep} disabled={disabled}>
      <Text>next</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 22,
    backgroundColor: 'red',
  },
});
