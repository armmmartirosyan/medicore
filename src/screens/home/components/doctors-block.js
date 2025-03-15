import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Doctor3 as doctor3, Doctor2 as doctor2} from '@images';
import {useNavigation} from '@react-navigation/native';
import {DoctorCard, HeadText} from '@components';
import {useGetDoctors} from '@api-hooks';
import {getSize} from '@utils';

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

export function DoctorsBlock() {
  const navigation = useNavigation();
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  const {data: doctorss} = useGetDoctors({
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
