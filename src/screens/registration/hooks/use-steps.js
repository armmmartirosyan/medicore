import React, {useCallback, useMemo, useState} from 'react';
import {FirstStep, SecondStep, Congrats} from '../components';

const STEPS = [FirstStep, SecondStep, Congrats];

export function useSteps() {
  const [step, setStep] = useState(0);

  const StepComponent = useMemo(() => {
    return STEPS[step];
  }, [step]);

  const onNextStep = useCallback(() => {
    setStep(prev => {
      if (prev < STEPS.length - 1) {
        return prev + 1;
      }

      return prev;
    });
  }, []);

  const onPrevStep = useCallback(() => {
    setStep(prev => {
      if (prev > 0) {
        return prev - 1;
      }

      return prev;
    });
  }, []);

  return {
    step,
    onNextStep,
    onPrevStep,
    StepComponent: () => (
      <StepComponent onNextStep={onNextStep} onPrevStep={onPrevStep} />
    ),
  };
}
