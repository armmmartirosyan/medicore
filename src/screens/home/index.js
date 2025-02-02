import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Doctor1 as doctor1, Doctor2 as doctor2} from '@images';
import {DoctorCard} from '@components';
import {COLORS} from '@constants';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';

function HomeComponent() {
  const [selectedDate, setSelectedDate] = useState(11);

  const dates = [9, 10, 11, 12, 13, 14];
  const doctors = [
    {
      id: 1,
      name: 'Dr. Olivia Turner, M.D.',
      specialization: 'Dermato-Endocrinology',
      rating: 5,
      reviews: 60,
      image: doctor1,
    },
    {
      id: 2,
      name: 'Dr. Alexander Bennett, Ph.D.',
      specialization: 'Dermato-Genetics',
      rating: 4.5,
      reviews: 40,
      image: doctor2,
    },
    {
      id: 3,
      name: 'Dr. Sophia Martinez, Ph.D.',
      specialization: 'Cosmetic Bioengineering',
      rating: 5,
      reviews: 150,
      image: doctor1,
    },
    {
      id: 4,
      name: 'Dr. Michael Davidson, M.D.',
      specialization: 'Nano-Dermatology',
      rating: 4.8,
      reviews: 90,
      image: doctor2,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        horizontal
        contentContainerStyle={styles.dateSelector}
        showsHorizontalScrollIndicator={false}>
        {dates.map(date => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateButton,
              selectedDate === date && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate(date)}>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Appointment Info */}
      <View style={styles.appointmentInfo}>
        <Text style={styles.appointmentTime}>10 AM</Text>
        <View style={styles.appointmentDetails}>
          <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
          <Text style={styles.doctorspecialization}>
            Treatment and prevention of skin and photodermatitis.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.doctorList}>
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onPress={() => {}}
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
    // backgroundColor: 'white',
    paddingHorizontal: getSize(20),
    position: 'relative',
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: getSize(20),
  },
  dateButton: {
    backgroundColor: '#E1E8FF',
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(15),
    borderRadius: getSize(10),
    marginRight: getSize(10),
  },
  selectedDateButton: {
    backgroundColor: '#4A90E2',
  },
  dateText: {
    color: '#4A90E2',
  },
  selectedDateText: {
    color: '#FFF',
  },
  appointmentInfo: {
    backgroundColor: '#E1E8FF',
    padding: getSize(15),
    borderRadius: getSize(10),
    marginBottom: getSize(20),
  },
  appointmentTime: {
    fontWeight: 'bold',
    marginBottom: getSize(10),
  },
  doctorList: {
    flex: 1,
  },
  doctorCard: {
    marginBottom: getSize(18),
  },
});

export const Home = withSafeArea(HomeComponent);
