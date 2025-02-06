import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {HeadText} from '@components';
import {COLORS, FONTS} from '@constants';
import {withSafeArea} from '@hoc';

function MedicineDetailsComponent({route, navigation}) {
  const {medicine, dose, startDate, dayCount, quantity, notes, doctor} =
    route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>Medicine Details</HeadText>
        <View />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{medicine}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dose:</Text>
          <Text style={styles.value}>{dose}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{startDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Day Count:</Text>
          <Text style={styles.value}>{dayCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{quantity}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notes}>{notes || 'No notes provided.'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Prescribed by</Text>
        <Text style={styles.doctorName}>{doctor}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: COLORS.SOLITUDE_BLUE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
  value: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 18,
    marginBottom: 8,
  },
  notes: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
  doctorName: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
});

export const MedicineDetails = withSafeArea(MedicineDetailsComponent);
