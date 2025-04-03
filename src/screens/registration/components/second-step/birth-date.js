import React, {useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {DatePicker} from '@components';
import {
  registrationSelectors,
  changeRegistrationState,
} from '@store/registration';
import {getSize} from '@utils';

export function BirthDate() {
  const value = useSelector(registrationSelectors.birthDateSelector);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    newDate => {
      const birthDate = new Date(newDate).toDateString();

      dispatch(changeRegistrationState({birthDate}));
    },
    [dispatch],
  );

  const minDate = useMemo(() => {
    var currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 200);

    return currentDate;
  }, []);

  return (
    <DatePicker
      value={value}
      label="Birth date"
      onDateChange={handleChange}
      containerStyle={styles.containerStyle}
      maxDate={new Date()}
      minDate={minDate}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: getSize(18),
  },
});
