import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {COLORS, FONTS, API_BASE_URL} from '@constants';
import {getSize} from '@utils';
import {DefaultDoctor as defaultDoctor} from '@images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClinicMedical,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';

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
        <View style={styles.row}>
          <FontAwesomeIcon
            icon={faStethoscope}
            color="black"
            size={getSize(15)}
          />
          <Text style={styles.specialization}>
            {doctor.doctorsSpecializations?.[0]?.specialization?.name}
          </Text>
        </View>
        {doctor.clinic?.name && (
          <View style={styles.row}>
            <FontAwesomeIcon
              icon={faClinicMedical}
              color="black"
              size={getSize(15)}
            />
            <Text style={styles.specialization}>{doctor.clinic?.name}</Text>
          </View>
        )}
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
    width: '100%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  specialization: {
    fontFamily: FONTS.LIGHT,
    fontSize: getSize(12),
    color: 'black',
    marginLeft: getSize(6),
  },
});
