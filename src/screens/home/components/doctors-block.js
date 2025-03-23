import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DoctorCard, HeadText} from '@components';
import {useGetDoctors} from '@api-hooks';
import {getSize} from '@utils';

const MOCK = [
  {
    id: 1,
    firstName: 'FName',
    lastName: 'LName',
    phone: '+37491777418',
    email: 'flname@mail.ru',
    imageUrl: null,
    password: null,
    birthDate: '0001-01-01',
    isActive: null,
    createdAt: '2025-02-02T11:52:15',
    typesId: 1,
    medicinesAssignedDoctors: [],
    medicinesAssignedPatients: [],
    notWorkingDays: [
      {id: 1, notWorkDate: '2025-03-17', doctorId: 1, doctor: null},
      {id: 2, notWorkDate: '2025-03-18', doctorId: 1, doctor: null},
      {id: 3, notWorkDate: '2025-03-19', doctorId: 1, doctor: null},
      {id: 4, notWorkDate: '2025-03-20', doctorId: 1, doctor: null},
      {id: 5, notWorkDate: '2025-03-21', doctorId: 1, doctor: null},
      {id: 6, notWorkDate: '2025-03-22', doctorId: 1, doctor: null},
    ],
    types: {id: 1, name: 'Doctor', users: []},
    visitDoctors: [],
    visitPatients: [],
    weekDaySchedules: [
      {
        id: 1,
        startTime: '09:00:00',
        endTime: '18:00:00',
        breakStartTime: '13:00:00',
        breakEndTime: '14:00:00',
        doctorId: 1,
        weekDayId: 1,
        doctor: null,
        weekDay: null,
      },
      {
        id: 2,
        startTime: '09:00:00',
        endTime: '18:00:00',
        breakStartTime: '13:00:00',
        breakEndTime: '14:00:00',
        doctorId: 1,
        weekDayId: 2,
        doctor: null,
        weekDay: null,
      },
      {
        id: 3,
        startTime: '09:00:00',
        endTime: '18:00:00',
        breakStartTime: '13:00:00',
        breakEndTime: '14:00:00',
        doctorId: 1,
        weekDayId: 3,
        doctor: null,
        weekDay: null,
      },
      {
        id: 4,
        startTime: '09:00:00',
        endTime: '18:00:00',
        breakStartTime: '13:00:00',
        breakEndTime: '14:00:00',
        doctorId: 1,
        weekDayId: 4,
        doctor: null,
        weekDay: null,
      },
      {
        id: 5,
        startTime: '09:00:00',
        endTime: '18:00:00',
        breakStartTime: '13:00:00',
        breakEndTime: '14:00:00',
        doctorId: 1,
        weekDayId: 5,
        doctor: null,
        weekDay: null,
      },
    ],
    specializations: [],
    doctorsSpecializations: [
      {doctorId: 1, specializationId: 2, doctor: null, specialization: null},
      {doctorId: 1, specializationId: 3, doctor: null, specialization: null},
    ],
  },
];

export function DoctorsBlock() {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  useGetDoctors({
    page,
    options: {
      onSuccess: data => {
        setDoctors(prev => [...prev, ...data?.data?.data]);
        setAllowNext(data?.data?.allowNext);
      },
    },
  });

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  return (
    <>
      <HeadText style={styles.headText}>Doctors</HeadText>
      <FlatList
        data={doctors}
        style={styles.list}
        keyExtractor={d => d.id}
        onEndReached={handleEndReached}
        renderItem={({item, index}) => (
          <DoctorCard
            key={item.key}
            doctor={item}
            onPress={() => navigation.navigate('DoctorInfo', {doctor: item})}
            style={index + 1 === doctors.length ? {} : styles.doctorCard}
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
  doctorCard: {
    marginBottom: getSize(18),
  },
  headText: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});
