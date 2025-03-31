import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {getSize} from '@utils';

export const MedicineCard = ({medicine, onSuccess}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.medicineName}>{medicine.name}</Text>
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
          onPress={() =>
            navigation.navigate('MedicineDetails', {...medicine, onSuccess})
          }>
          <Text style={styles.moreText}>{'More >'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.SOLITUDE_BLUE,
    borderRadius: getSize(12),
    padding: getSize(16),
    marginVertical: getSize(8),
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getSize(10),
  },
  medicineName: {
    fontSize: getSize(20),
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    marginBottom: getSize(12),
  },
  detailText: {
    fontSize: getSize(14),
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    marginBottom: getSize(4),
  },
  moreContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  moreText: {
    fontSize: getSize(14),
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
  },
});
