import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

export const MedicineCard = ({medicine}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.medicineName}>{medicine.medicine}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.detailText}>
            Start Date: {moment(medicine.startDate).format('MMM Do, YY')}
          </Text>
          <Text style={styles.detailText}>Days: {medicine.dayCount}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.detailText}>Dose: {medicine.dose}</Text>
          <Text style={styles.detailText}>Quantity: {medicine.quantity}</Text>
        </View>
      </View>
      <View style={styles.moreContainer}>
        <TouchableOpacity
          activeOpacity={ACTIVE_BTN_OPACITY}
          onPress={() => navigation.navigate('MedicineDetails', {...medicine})}>
          <Text style={styles.moreText}>{'More >'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.SOLITUDE_BLUE,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 20,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    marginBottom: 4,
  },
  moreContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  moreText: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
  },
});
