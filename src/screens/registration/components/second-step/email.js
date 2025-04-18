import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';
import {getSize} from '@utils';

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
      label="Email"
      placeholder="example@example.com"
      onChangeText={handleChange}
      keyboardType="email-address"
      containerStyle={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: getSize(18),
  },
});
