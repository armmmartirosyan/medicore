import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useGetMedicinesAssigned} from '@api-hooks';
import {HeadText, MedicineCard} from '@components';
import {withSafeArea} from '@hoc';
import {useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';

const MOCK_MEDICINES = [
  {
    id: 1,
    name: 'Med 1',
    dose: '100 mg',
    notes: 'no nottttttt',
    startDate: '2025-03-17',
    quantity: 2,
    dayCount: 3,
    doctorId: 1,
    patientId: 5,
    visitProcedureId: 1,
    doctor: null,
    patient: null,
    visitProcedure: null,
  },
  {
    id: 2,
    name: 'Med 2',
    dose: '100 mg',
    notes: 'no nottttttt',
    startDate: '2025-03-17',
    quantity: 2,
    dayCount: 3,
    doctorId: 1,
    patientId: 5,
    visitProcedureId: 1,
    doctor: null,
    patient: null,
    visitProcedure: null,
  },
  {
    id: 3,
    name: 'Med 3',
    dose: '100 mg',
    notes: 'no nottttttt',
    startDate: '2025-03-17',
    quantity: 2,
    dayCount: 3,
    doctorId: 1,
    patientId: 5,
    visitProcedureId: 1,
    doctor: null,
    patient: null,
    visitProcedure: null,
  },
  {
    id: 4,
    name: 'Med 4',
    dose: '100 mg',
    notes: 'no nottttttt',
    startDate: '2025-03-17',
    quantity: 2,
    dayCount: 3,
    doctorId: 1,
    patientId: 5,
    visitProcedureId: 1,
    doctor: null,
    patient: null,
    visitProcedure: null,
  },
  {
    id: 5,
    name: 'Med 5',
    dose: '100 mg',
    notes: 'no nottttttt',
    startDate: '2025-03-17',
    quantity: 2,
    dayCount: 3,
    doctorId: 1,
    patientId: 5,
    visitProcedureId: 2,
    doctor: null,
    patient: null,
    visitProcedure: null,
  },
];

function MedicinesComponent() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [medicinesAssigned, setMedicinesAssigned] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  useGetMedicinesAssigned({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.data?.allowNext);
        setMedicinesAssigned(prev => [...prev, ...data?.data?.data]);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  const onSuccess = () => {
    setMedicinesAssigned([]);
    setAllowNext(false);
    setPage(1);
    queryClient.invalidateQueries(['get-medicines-assigned']);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeadText style={styles.headerText}>Assigned Medicines</HeadText>
      <FlatList
        style={styles.list}
        data={medicinesAssigned}
        keyExtractor={ma => ma.id}
        onEndReached={handleEndReached}
        renderItem={({item}) => (
          <MedicineCard key={item.key} medicine={item} onSuccess={onSuccess} />
        )}
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
