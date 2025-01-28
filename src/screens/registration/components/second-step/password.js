import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function Password() {
  const dispatch = useDispatch();
  const value = useSelector(registrationSelectors.passwordSelector);

  const handleChange = useCallback(
    password => {
      dispatch(changeRegistrationState({password}));
    },
    [dispatch],
  );

  return (
    <Input
      value={value}
      placeholder="Password"
      onChangeText={handleChange}
      containerStyle={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 22,
  },
});
