import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {HeadText, MedicineCard} from '@components';
import {withSafeArea} from '@hoc';

const MOCK_MEDICINES = [
  {
    medicine: 'Amoxicillin',
    id: 1,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 2,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 3,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 4,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 5,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 6,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
  {
    medicine: 'Amoxicillin',
    id: 7,
    dose: '500mg',
    startDate: '2025-02-01',
    dayCount: '7 days',
    quantity: '14 tablets',
    notes: 'Take after meals to reduce stomach upset.',
    doctor: 'Dr. Olivia Turner, M.D.',
  },
];

function MedicinesComponent() {
  return (
    <View style={styles.container}>
      <HeadText style={styles.headerText}>Assigned Medicines</HeadText>
      <ScrollView style={styles.list}>
        {MOCK_MEDICINES.map(medicine => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
});

export const Medicines = withSafeArea(MedicinesComponent);
