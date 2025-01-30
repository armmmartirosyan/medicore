import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {PasswordInput} from '@components';
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
    <PasswordInput
      value={value}
      label="Password"
      placeholder="···················"
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
