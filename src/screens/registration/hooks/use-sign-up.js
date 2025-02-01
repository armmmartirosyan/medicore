import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthSignUp} from '@api-hooks';
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

export function useSignUp(onNextStep) {
  const dispatch = useDispatch();
  const firstName = useSelector(registrationSelectors.fNameSelector);
  const lastName = useSelector(registrationSelectors.lNameSelector);
  const phoneNumber = useSelector(registrationSelectors.phoneNumberSelector);
  const birthDate = useSelector(registrationSelectors.birthDateSelector);
  const email = useSelector(registrationSelectors.emailSelector);
  const password = useSelector(registrationSelectors.passwordSelector);

  const onSuccess = useCallback(
    signUpToken => {
      onNextStep();
      dispatch(
        changeRegistrationState({
          signUpToken: 'token',
        }),
      );
      console.log('onSuccess');
    },
    [onNextStep, dispatch],
  );

  const onError = useCallback(() => {
    Toast.show({
      autoClose: 2000,
      title: 'Error',
      type: ALERT_TYPE.DANGER,
      textBody: 'Invalid field(s) value',
    });
  }, []);

  const {mutate: signUp, isLoading} = useAuthSignUp({
    onError: onSuccess,
    onSuccess,
  });

  const disabled = useMemo(() => {
    return (
      !isValidPhoneNumber(phoneNumber) ||
      !isSecurePassword(password) ||
      !isValidName(firstName) ||
      !isValidName(lastName) ||
      !isValidEmail(email) ||
      !birthDate ||
      isLoading
    );
  }, [birthDate, email, password, isLoading]);

  const handleSignUp = useCallback(() => {
    if (disabled) {
      return;
    }

    signUp({email, password, firstName, lastName, phoneNumber});
  }, [disabled, signUp, email, password, firstName, lastName, phoneNumber]);

  return {
    disabled,
    isLoading,
    handleSignUp,
  };
}
