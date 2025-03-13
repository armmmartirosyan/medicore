import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {DatePicker} from '@components';
import {profileSelectors, changeProfileState} from '@store/profile';

export function BirthDate() {
  const value = useSelector(profileSelectors.birthDateSelector);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    newDate => {
      const birthDate = new Date(newDate).toDateString();

      dispatch(changeProfileState({birthDate}));
    },
    [dispatch],
  );

  return (
    <DatePicker
      value={value}
      label="Birth date"
      onDateChange={handleChange}
      containerStyle={styles.containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 18,
  },
});
