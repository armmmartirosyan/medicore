import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function FirstName() {
  const dispatch = useDispatch();
  const value = useSelector(registrationSelectors.fNameSelector);

  const handleChange = useCallback(
    firstName => {
      dispatch(
        changeRegistrationState({
          firstName,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Input
      value={value}
      label="First name"
      placeholder="John"
      onChangeText={handleChange}
      containerStyle={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
});
