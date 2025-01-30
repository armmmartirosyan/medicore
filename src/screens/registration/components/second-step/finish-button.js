import React from 'react';
import {useFinishDisabled} from '@screens/registration/hooks';
import {Button} from '@components';

export function FinishButton({onNextStep}) {
  const disabled = useFinishDisabled();

  return (
    <Button onPress={onNextStep} disabled={disabled}>
      Finish
    </Button>
  );
}
