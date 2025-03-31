import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClipboardList,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import {FONTS, COLORS} from '@constants';
import moment from 'moment/moment';
import {getSize} from '@utils';

export function ProcedureCard({procedure, onPress}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <FontAwesomeIcon
          icon={faClipboardList}
          size={getSize(20)}
          color={COLORS.ACTIVE_BLUE}
        />
        <Text style={styles.procedureName}>{procedure?.procedure.name}</Text>
      </View>
      <View style={styles.cardFooter}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          size={getSize(16)}
          color={COLORS.GRAYISH}
        />
        <Text style={styles.procedureDate}>
          {moment(procedure?.visit?.startScheduledDate).format('YYYY-MM-DD')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: getSize(16),
    padding: getSize(16),
    marginVertical: getSize(8),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: getSize(2)},
    shadowRadius: getSize(6),
    elevation: getSize(3),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureName: {
    marginLeft: getSize(8),
    fontSize: getSize(16),
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureDate: {
    marginLeft: getSize(8),
    fontSize: getSize(14),
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
  },
});
