import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {profileSelectors, changeProfileState} from '@store/profile';

export function FirstName() {
  const dispatch = useDispatch();
  const value = useSelector(profileSelectors.fNameSelector);

  const handleChange = useCallback(
    firstName => {
      dispatch(
        changeProfileState({
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
