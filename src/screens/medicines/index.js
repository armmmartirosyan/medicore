import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useGetMedicinesAssigned} from '@api-hooks';
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
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  const {data: medicinesAssigned} = useGetMedicinesAssigned({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.allowNext);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  console.log({medicinesAssigned});

  return (
    <View style={styles.container}>
      <HeadText style={styles.headerText}>Assigned Medicines</HeadText>
      <FlatList
        style={styles.list}
        data={MOCK_MEDICINES}
        keyExtractor={ma => ma.id}
        onEndReached={handleEndReached}
        renderItem={({item}) => <MedicineCard key={item.key} medicine={item} />}
      />
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
