import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  Linking,
  ScrollView,
} from 'react-native';
import {faAngleLeft, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {HeadText, NonWorkingDate, WeekScheduleModal} from '@components';
import {COLORS, FONTS} from '@constants';
import {withSafeArea} from '@hoc';

const NON_WORKING_DATES = [
  '2025-02-10',
  '2025-02-14',
  '2025-02-20',
  '2025-02-25',
  '2025-03-01',
];

const SCHEDULE = [
  {day: 'Monday', start: '09:00 AM', end: '05:00 PM'},
  {day: 'Tuesday', start: '09:00 AM', end: '05:00 PM'},
  {day: 'Wednesday', start: '09:00 AM', end: '05:00 PM'},
  {day: 'Thursday', start: '09:00 AM', end: '05:00 PM'},
  {day: 'Friday', start: '09:00 AM', end: '04:00 PM'},
  {day: 'Saturday', start: 'Closed', end: ''},
  {day: 'Sunday', start: 'Closed', end: ''},
];

export default function DoctorInfoComponent({route, navigation}) {
  const {doctor} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const age = useMemo(() => {
    if (!doctor.birthDate) {
      return '';
    }

    return new Date().getFullYear() - new Date(doctor.birthDate).getFullYear();
  }, [doctor?.birthDate]);

  const onPhonePress = useCallback(phone => {
    const phoneUrl = `tel:${phone}`;

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Toast.show({
            autoClose: 2000,
            title: 'Error',
            type: ALERT_TYPE.DANGER,
            textBody: 'Unable to make a call on this device.',
          });
        }
      })
      .catch(err => console.error('Error opening phone URL:', err));
  }, []);

  const onModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>Doctor Info</HeadText>
        <View />
      </View>
      <View style={styles.inforContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={doctor.image}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoWrapper}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoName}>Age:</Text>
              <Text style={styles.infoValue}>{age}</Text>
            </View>
            <Pressable
              style={styles.infoBlock}
              // onPress={() => onPhonePress(doctor.phone)}
            >
              <FontAwesomeIcon
                style={styles.infoIcon}
                icon={faPhone}
                size={12}
              />
              <Text> </Text>
              <Text style={styles.infoValue}>{doctor.phone}</Text>
            </Pressable>
            <Pressable
              style={styles.infoBlock}
              onPress={() => setModalVisible(true)}>
              <FontAwesomeIcon
                style={styles.infoIcon}
                icon={faCalendarDays}
                size={12}
              />
              <Text> </Text>
              <Text style={styles.infoValue}>Schedule</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {doctor.firstName} {doctor.lastName}
          </Text>
          <Text style={styles.specialization}>{doctor.specializations[0]}</Text>
        </View>
      </View>
      <Text style={styles.nonWorkingTitle}>Non-Working Days</Text>

      <ScrollView style={styles.nonWorkingWrapper}>
        {NON_WORKING_DATES.map(date => (
          <NonWorkingDate style={styles.dateItem} key={date} date={date} />
        ))}
      </ScrollView>
      <WeekScheduleModal
        visible={modalVisible}
        onClose={onModalClose}
        schedule={SCHEDULE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  inforContainer: {
    width: '100%',
    borderRadius: 17,
    backgroundColor: COLORS.SECONDARY_BLUE,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  infoWrapper: {
    justifyContent: 'space-around',
  },
  infoBlock: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 18,
    backgroundColor: COLORS.PRIMARY_BLUE,
    height: 27,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 7,
  },
  infoName: {
    color: 'white',
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    marginRight: 5,
  },
  infoIcon: {
    color: 'white',
    marginRight: 5,
  },
  infoValue: {
    color: 'white',
    fontFamily: FONTS.LIGHT,
    fontSize: 12,
  },
  nameContainer: {
    width: '100%',
    borderRadius: 13,
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
  },
  name: {
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.MEDIUM,
    fontSize: 15,
    marginRight: 5,
  },
  specialization: {
    color: 'black',
    fontFamily: FONTS.LIGHT,
    fontSize: 15,
    marginRight: 5,
  },
  nonWorkingTitle: {
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
export const DoctorInfo = withSafeArea(DoctorInfoComponent);
