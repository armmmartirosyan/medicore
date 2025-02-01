import {useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  isValidEmail,
  isSecurePassword,
  isValidName,
  isValidPhoneNumber,
} from '@utils';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';
import {useAuthSignUp} from '@api-hooks';

export function useSignUp(onNextStep) {
  const dispatch = useDispatch();
  const firstName = useSelector(registrationSelectors.fNameSelector);
  const lastName = useSelector(registrationSelectors.lNameSelector);
  const phoneNumber = useSelector(registrationSelectors.phoneNumberSelector);
  const birthDate = useSelector(registrationSelectors.birthDateSelector);
  const email = useSelector(registrationSelectors.emailSelector);
  const password = useSelector(registrationSelectors.passwordSelector);

  const disabled = useMemo(() => {
    return (
      !isValidName(firstName) ||
      !isValidName(lastName) ||
      !isValidPhoneNumber(phoneNumber) ||
      !birthDate ||
      !isValidEmail(email) ||
      !isSecurePassword(password)
    );
  }, [birthDate, email, password]);

  const onSuccess = useCallback(
    signUpToken => {
      dispatch(
        changeRegistrationState({
          signUpToken: 'token',
        }),
      );
      onNextStep();
      console.log('onSuccess');
    },
    [onNextStep, dispatch],
  );

  const onError = useCallback(() => {
    console.log('onError');
  }, []);

  const {mutate: signUp} = useAuthSignUp({
    onError: onSuccess,
    onSuccess,
  });

  const handleSignUp = useCallback(() => {
    if (disabled) {
      return;
    }

    signUp({email, password, firstName, lastName, phoneNumber});
  }, [disabled, signUp, email, password, firstName, lastName, phoneNumber]);

  return {
    disabled,
    handleSignUp,
  };
}
