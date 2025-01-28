import {useCallback, useMemo, useState} from 'react';
import {FirstStep, SecondStep, Congrats} from '../components';

const STEPS = [FirstStep, SecondStep, Congrats];

export function useSteps() {
  const [step, setStep] = useState(0);

  const allowPrev = true; // TODO: Write logic in case needed
  const allowNext = true; // TODO: Write logic in case needed

  const StepComponent = useMemo(() => {
    return STEPS[step];
  }, [step]);

  const onNextStep = useCallback(() => {
    setStep(prev => {
      if (prev < STEPS.length - 1 && allowNext) {
        return prev + 1;
      }

      return prev;
    });
  }, []);

  const onPrevStep = useCallback(() => {
    setStep(prev => {
      if (prev > 0 && allowPrev) {
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
