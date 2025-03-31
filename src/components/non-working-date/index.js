import React from 'react';
import moment from 'moment/moment';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarXmark} from '@fortawesome/free-solid-svg-icons';
import {COLORS, FONTS} from '@constants';
import {getSize} from '@utils';

export function NonWorkingDate({date, style = {}}) {
  return (
    <View style={[styles.dateItem, style]}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={faCalendarXmark}
          color={COLORS.ACTIVE_BLUE}
          size={getSize(20)}
        />
      </View>
      <Text style={styles.dateText}>
        {moment(date.notWorkDate).format('MMMM Do, YYYY')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nonWorkingWrapper: {
    flex: 1,
  },
  dateItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize(10),
    paddingVertical: getSize(5),
  },
  dateText: {
    color: 'black',
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(15),
    width: '65%',
  },
  iconContainer: {
    width: '35%',
    alignItems: 'flex-end',
    marginRight: getSize(10),
  },
});
