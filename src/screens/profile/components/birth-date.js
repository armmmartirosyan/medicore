import React, {useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {DatePicker} from '@components';
import {profileSelectors, changeProfileState} from '@store/profile';
import moment from 'moment';
import {getSize} from '@utils';

export function BirthDate() {
  const value = useSelector(profileSelectors.birthDateSelector);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    newDate => {
      const birthDate = moment(newDate).format('YYYY-MM-DD');

      dispatch(changeProfileState({birthDate}));
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
