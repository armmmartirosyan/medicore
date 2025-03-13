import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {profileSelectors, changeProfileState} from '@store/profile';
import {PhoneInput} from '@components';

export function Phone() {
  const dispatch = useDispatch();
  const number = useSelector(profileSelectors.phoneNumberSelector);

  const handleNumberChange = useCallback(
    phoneNumber => {
      dispatch(
        changeProfileState({
          phoneNumber,
        }),
      );
    },
    [dispatch],
  );

  const handleCountryChange = useCallback(
    country => {
      dispatch(
        changeProfileState({
          phoneCode: `+${country.callingCode[0]}`,
        }),
      );
    },
    [dispatch],
  );

  return (
    <PhoneInput
      value={number}
      label="Phone number"
      placeholder="91777418"
      onChangeText={handleNumberChange}
      onChangeCountry={handleCountryChange}
      containerStyle={styles.containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 18,
  },
});
