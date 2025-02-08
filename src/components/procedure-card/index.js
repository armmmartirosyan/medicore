import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClipboardList,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import {FONTS, COLORS} from '@constants';

export function ProcedureCard({procedure, onPress}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <FontAwesomeIcon
          icon={faClipboardList}
          size={20}
          color={COLORS.ACTIVE_BLUE}
        />
        <Text style={styles.procedureName}>{procedure.procedure.name}</Text>
      </View>
      <View style={styles.cardFooter}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          size={16}
          color={COLORS.GRAYISH}
        />
        <Text style={styles.procedureDate}>{procedure.date}</Text>
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
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureName: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  procedureDate: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
  },
});
