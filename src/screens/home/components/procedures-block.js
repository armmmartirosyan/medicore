import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {HeadText, ProcedureCard} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useGetVisitProcedures} from '@api-hooks';
import {useQueryClient} from 'react-query';

const MOCK = [
  {
    id: 1,
    visitId: 1,
    procedureId: 1,
    notes: 'noo',
    createdAt: '2025-03-14T22:42:00',
    medicinesAssigneds: [],
    procedure: {
      id: 1,
      name: 'Dental Examination',
      price: 5000,
      isActive: true,
      visitsProcedures: [],
    },
    procedureImages: [],
    visit: {
      id: 1,
      doctorId: 2,
      patientId: 6,
      startScheduledDate: '2025-05-06T15:30:50',
      endScheduledDate: '2025-05-06T16:30:50',
      startActualDate: null,
      endActualDate: null,
      notes: 'string',
      createdAt: '2025-03-14T22:40:22',
      statusId: 1,
      doctor: null,
      patient: null,
      status: null,
      visitsProcedures: [],
    },
  },
  {
    id: 2,
    visitId: 2,
    procedureId: 2,
    notes: 'noo2',
    createdAt: '2025-03-14T22:44:57',
    medicinesAssigneds: [],
    procedure: {
      id: 2,
      name: 'Teeth Cleaning ',
      price: 10000,
      isActive: true,
      visitsProcedures: [],
    },
    procedureImages: [],
    visit: {
      id: 2,
      doctorId: 2,
      patientId: 6,
      startScheduledDate: '2025-05-07T15:30:50',
      endScheduledDate: '2025-05-07T16:30:50',
      startActualDate: null,
      endActualDate: null,
      notes: 'string',
      createdAt: '2025-03-14T22:42:50',
      statusId: 1,
      doctor: null,
      patient: null,
      status: null,
      visitsProcedures: [],
    },
  },
  {
    id: 3,
    visitId: 3,
    procedureId: 3,
    notes: 'noo3',
    createdAt: '2025-03-14T22:45:05',
    medicinesAssigneds: [],
    procedure: {
      id: 3,
      name: 'Tooth Filling ',
      price: 20000,
      isActive: true,
      visitsProcedures: [],
    },
    procedureImages: [],
    visit: {
      id: 3,
      doctorId: 2,
      patientId: 6,
      startScheduledDate: '2025-05-08T15:30:50',
      endScheduledDate: '2025-05-08T16:30:50',
      startActualDate: null,
      endActualDate: null,
      notes: 'string',
      createdAt: '2025-03-14T22:43:01',
      statusId: 1,
      doctor: null,
      patient: null,
      status: null,
      visitsProcedures: [],
    },
  },
  {
    id: 4,
    visitId: 4,
    procedureId: 4,
    notes: 'noo4',
    createdAt: '2025-03-14T22:45:11',
    medicinesAssigneds: [],
    procedure: {
      id: 4,
      name: 'Tooth Extraction',
      price: 23000,
      isActive: true,
      visitsProcedures: [],
    },
    procedureImages: [],
    visit: {
      id: 4,
      doctorId: 2,
      patientId: 6,
      startScheduledDate: '2025-05-09T15:30:50',
      endScheduledDate: '2025-05-09T16:30:50',
      startActualDate: null,
      endActualDate: null,
      notes: 'string',
      createdAt: '2025-03-14T22:43:08',
      statusId: 1,
      doctor: null,
      patient: null,
      status: null,
      visitsProcedures: [],
    },
  },
  {
    id: 5,
    visitId: 1,
    procedureId: 2,
    notes: 'noo12',
    createdAt: '2025-03-14T22:49:19',
    medicinesAssigneds: [],
    procedure: {
      id: 2,
      name: 'Teeth Cleaning ',
      price: 10000,
      isActive: true,
      visitsProcedures: [],
    },
    procedureImages: [],
    visit: {
      id: 1,
      doctorId: 2,
      patientId: 6,
      startScheduledDate: '2025-05-06T15:30:50',
      endScheduledDate: '2025-05-06T16:30:50',
      startActualDate: null,
      endActualDate: null,
      notes: 'string',
      createdAt: '2025-03-14T22:40:22',
      statusId: 1,
      doctor: null,
      patient: null,
      status: null,
      visitsProcedures: [],
    },
  },
];

export function ProceduresBlock() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [procedures, setProcedures] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  useGetVisitProcedures({
    page,
    options: {
      onSuccess: data => {
        setAllowNext(data?.data?.allowNext);
        setProcedures(prev => [...prev, ...data?.data?.data]);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  const onSuccess = () => {
    setProcedures([]);
    setAllowNext(false);
    setPage(1);
    queryClient.invalidateQueries(['get-visit-procedures']);
    navigation.goBack();
  };

  return (
    <>
      <HeadText style={styles.headText}>Procedures</HeadText>
      <FlatList
        data={procedures}
        style={styles.list}
        keyExtractor={p => p.id}
        onEndReached={handleEndReached}
        renderItem={({item}) => (
          <ProcedureCard
            key={item.key}
            procedure={item}
            onPress={() =>
              navigation.navigate('ProcedureDetails', {
                onSuccess,
                id: item.id,
              })
            }
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  headText: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
