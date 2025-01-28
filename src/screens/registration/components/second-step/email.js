import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function Email() {
  const dispatch = useDispatch();
  const value = useSelector(registrationSelectors.emailSelector);

  const handleChange = useCallback(
    email => {
      dispatch(changeRegistrationState({email}));
    },
    [dispatch],
  );

  return (
    <Input
      value={value}
      placeholder="Email"
      onChangeText={handleChange}
      keyboardType="email-address"
      containerStyle={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 22,
  },
});
