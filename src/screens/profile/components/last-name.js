import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';

export function LastName() {
  const dispatch = useDispatch();
  const value = useSelector(registrationSelectors.lNameSelector);

  const handleChange = useCallback(
    lastName => {
      dispatch(
        changeRegistrationState({
          lastName,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Input
      value={value}
      label="Last name"
      placeholder="Doe"
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
