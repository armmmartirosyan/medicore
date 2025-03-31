import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Input} from '@components';
import {profileSelectors, changeProfileState} from '@store/profile';
import {getSize} from '@utils';

export function LastName() {
  const dispatch = useDispatch();
  const value = useSelector(profileSelectors.lNameSelector);

  const handleChange = useCallback(
    lastName => {
      dispatch(
        changeProfileState({
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
    marginBottom: getSize(18),
  },
});
