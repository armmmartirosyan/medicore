import React, {useCallback} from 'react';
import {PhoneInput} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function Phone() {
  const dispatch = useDispatch();
  const number = useSelector(registrationSelectors.phoneNumberSelector);

  const handleNumberChange = useCallback(
    phoneNumber => {
      dispatch(
        changeRegistrationState({
          phoneNumber,
        }),
      );
    },
    [dispatch],
  );

  const handleCountryChange = useCallback(
    country => {
      dispatch(
        changeRegistrationState({
          phoneCode: `+${country.callingCode[0]}`,
        }),
      );
    },
    [dispatch],
  );

  return (
    <PhoneInput
      value={number}
      onChangeText={handleNumberChange}
      onChangeCountry={handleCountryChange}
    />
  );
}
