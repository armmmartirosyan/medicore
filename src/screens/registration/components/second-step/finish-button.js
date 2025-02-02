import React from 'react';
import {useSignUp} from '@screens/registration/hooks';
import {Button} from '@components';

export function FinishButton({onNextStep}) {
  const {disabled, handleSignUp, isLoading} = useSignUp(onNextStep);

  return (
    <Button onPress={handleSignUp} disabled={disabled} isLoading={isLoading}>
      Finish
    </Button>
  );
}
