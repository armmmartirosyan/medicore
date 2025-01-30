import React from 'react';
import {StyleSheet} from 'react-native';
import {useFirstStepDisabled} from '@screens/registration/hooks';
import {Button} from '@components';

export function NextButton({onNextStep}) {
  const disabled = useFirstStepDisabled();

  return (
    <Button style={styles.button} onPress={onNextStep} disabled={disabled}>
      Next step
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 18,
  },
});
