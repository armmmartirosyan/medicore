import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Doctor3 as doctor3, Doctor2 as doctor2} from '@images';
import {DoctorCard, HeadText, ProcedureCard} from '@components';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {
  Procedure1 as procedure1,
  Procedure2 as procedure2,
  Procedure3 as procedure3,
} from '@images';

const doctors = [
  {
    id: 1,
    firstName: 'Dr. Olivia',
    lastName: 'Turner',
    phone: '+37491777418',
    email: 'davidson@mail.ru',
    birthDate: '2000-02-04',
    image: doctor3,
    specializations: [
      'Dermato-Endocrinology',
      'Dermato-Endocrinology',
      'Dermato-Endocrinology',
    ],
  },
  {
    id: 2,
    firstName: 'Dr. Alexander',
    lastName: 'Bennett',
    phone: '+37491777418',
    email: 'davidson@mail.ru',
    birthDate: '2000-02-04',
    image: doctor2,
    specializations: [
      'Dermato-Genetics',
      'Dermato-Genetics',
      'Dermato-Genetics',
    ],
  },
  {
    id: 3,
    firstName: 'Dr. Sophia',
    lastName: 'Martinez',
    phone: '+37491777418',
    email: 'davidson@mail.ru',
    birthDate: '2000-02-04',
    image: doctor3,
    specializations: [
      'Cosmetic Bioengineering',
      'Cosmetic Bioengineering',
      'Cosmetic Bioengineering',
    ],
  },
  {
    id: 4,
    firstName: 'Dr. Michael',
    lastName: 'Davidson',
    phone: '+37491777418',
    email: 'davidson@mail.ru',
    birthDate: '2000-02-04',
    image: doctor2,
    specializations: [
      'Nano-Dermatology',
      'Nano-Dermatology',
      'Nano-Dermatology',
    ],
  },
];

const procedures = [
  {
    id: 1,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Procedure',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [],
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: '2025-02-02',
  },
  {
    id: 2,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Teeth Cleaning',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: '2025-02-02',
  },
  {
    id: 3,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Root Canal',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 4,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Whitening',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 5,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Procedure',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 6,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Teeth Cleaning',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 7,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Root Canal',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
  {
    id: 8,
    visitDate: '2025-01-02',
    procedure: {
      name: 'Whitening',
      price: 100,
      images: [
        procedure1,
        procedure2,
        procedure3,
        procedure1,
        procedure2,
        procedure3,
      ],
    },
    doctor: {
      id: 1,
      name: 'Dr. Michael Davidson',
    },
    medicines: [
      {id: 1, name: 'Painkiller'},
      {id: 2, name: 'Antibiotic'},
    ],
    notes: 'No need to worry about',
    date: '2025-02-02',
  },
];

function HomeComponent() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <HeadText style={styles.headText}>Recent Procedures</HeadText>
      <ScrollView style={styles.doctorList}>
        {procedures.map(procedure => (
          <ProcedureCard
            key={procedure.id}
            procedure={procedure}
            onPress={() => navigation.navigate('ProcedureDetails', {procedure})}
          />
        ))}
      </ScrollView>
      <HeadText style={styles.headText}>Doctors</HeadText>
      <ScrollView style={styles.doctorList}>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onPress={() => navigation.navigate('DoctorInfo', {doctor})}
            style={index + 1 === doctors.length ? {} : styles.doctorCard}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize(20),
    position: 'relative',
  },
  doctorList: {
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

export const Home = withSafeArea(HomeComponent);
