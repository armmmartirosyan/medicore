import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DoctorCard, HeadText} from '@components';
import {useGetDoctors} from '@api-hooks';
import {getSize} from '@utils';

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
    marginTop: getSize(10),
    marginBottom: getSize(20),
    textAlign: 'center',
  },
});
