import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function BirthDate() {
  const dispatch = useDispatch();
  const value = useSelector(registrationSelectors.birthDateSelector);

  const handleChange = useCallback(
    birthDate => {
      dispatch(changeRegistrationState({birthDate}));
    },
    [dispatch],
  );

  return (
    <Input
      value={value}
      placeholder="Birth date"
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
