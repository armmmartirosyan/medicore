import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import moment from 'moment';
import {useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthSignUp, useGetUserType} from '@api-hooks';
import {USER_TYPE_NAMES} from '@constants';
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
  const phoneCode = useSelector(registrationSelectors.phoneCodeSelector);
  const birthDate = useSelector(registrationSelectors.birthDateSelector);
  const email = useSelector(registrationSelectors.emailSelector);
  const password = useSelector(registrationSelectors.passwordSelector);

  const {data: userTypeData} = useGetUserType({name: USER_TYPE_NAMES.PATIENT});

  const onSuccess = useCallback(
    data => {
      if (!data) {
        Toast.show({
          autoClose: 2000,
          title: 'Error',
          type: ALERT_TYPE.DANGER,
          textBody: 'Something went wrong!',
        });

        return;
      }

      onNextStep();
      dispatch(
        changeRegistrationState({
          signUpToken: data?.data,
        }),
      );
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
    onError,
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
      isLoading ||
      !userTypeData?.data?.id
    );
  }, [
    phoneNumber,
    password,
    firstName,
    lastName,
    email,
    birthDate,
    isLoading,
    userTypeData?.data?.id,
  ]);

  const handleSignUp = useCallback(() => {
    if (disabled) {
      return;
    }

    const phone = phoneCode + phoneNumber;

    signUp({
      email,
      password,
      firstName,
      lastName,
      phone,
      typesId: userTypeData?.data?.id,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
      specializations: [2], //TODO: Remove this
    });
  }, [
    disabled,
    signUp,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    userTypeData?.data?.id,
    birthDate,
    phoneCode,
  ]);

  return {
    disabled,
    isLoading,
    handleSignUp,
  };
}
