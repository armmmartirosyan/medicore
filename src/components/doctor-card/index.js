import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {COLORS, FONTS, API_BASE_URL} from '@constants';
import {getSize} from '@utils';
import {DefaultDoctor as defaultDoctor} from '@images';

export function DoctorCard({doctor, style, onPress}) {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <Image
        style={styles.image}
        source={
          doctor.imageUrl
            ? {uri: `${API_BASE_URL}images/${doctor.imageUrl}`}
            : defaultDoctor
        }
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {doctor.firstName} {doctor.lastName}
        </Text>
        <Text style={styles.specialization}>
          {doctor.doctorsSpecializations?.[0]?.specialization?.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: getSize(74),
    backgroundColor: COLORS.SECONDARY_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getSize(8),
    paddingHorizontal: getSize(12),
    borderRadius: getSize(17),
  },
  image: {
    width: getSize(56),
    height: getSize(56),
    borderRadius: getSize(28),
    marginRight: getSize(10),
  },
  info: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: getSize(13),
    paddingHorizontal: getSize(12),
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(14),
    color: COLORS.PRIMARY_BLUE,
  },
  specialization: {
    fontFamily: FONTS.LIGHT,
    fontSize: getSize(12),
    color: 'black',
  },
});
