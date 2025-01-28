import React from 'react';
import {Pressable, Text} from 'react-native';
import {useFinishDisabled} from '@screens/registration/hooks';

export function FinishButton({onNextStep}) {
  const disabled = useFinishDisabled();

  return (
    <Pressable onPress={onNextStep} disabled={disabled}>
      <Text>Finish</Text>
    </Pressable>
  );
}
