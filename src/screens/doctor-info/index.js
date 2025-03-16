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
import {
  faAngleLeft,
  faPhone,
  faCalendarMinus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {HeadText, NonWorkingDate, WeekScheduleModal} from '@components';
import {COLORS, FONTS, API_BASE_URL} from '@constants';
import {withSafeArea} from '@hoc';
import {DefaultDoctor as defaultDoctor} from '@images';

export default function DoctorInfoComponent({route, navigation}) {
  const {doctor} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const age = useMemo(() => {
    return Math.floor(Math.random() * (55 - 30 + 1)) + 30;

    // if (!doctor.birthDate) {
    //   return '';
    // }

    // return new Date().getFullYear() - new Date(doctor.birthDate).getFullYear();
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
            source={
              doctor.imageUrl
                ? {uri: `${API_BASE_URL}images/${doctor.imageUrl}`}
                : defaultDoctor
            }
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
          <Text style={styles.specialization}>
            {doctor.doctorsSpecializations[0].specialization.name}
          </Text>
        </View>
      </View>
      <View style={styles.nonWorkingTitleBlock}>
        <FontAwesomeIcon
          icon={faCalendarMinus}
          size={18}
          color={COLORS.PRIMARY_BLUE}
        />
        <Text style={styles.nonWorkingTitle}>Non-Working Days</Text>
      </View>

      <ScrollView style={styles.nonWorkingWrapper}>
        {doctor.notWorkingDays.map(date => (
          <NonWorkingDate style={styles.dateItem} key={date.id} date={date} />
        ))}
      </ScrollView>
      <WeekScheduleModal
        visible={modalVisible}
        onClose={onModalClose}
        schedule={doctor.weekDaySchedules}
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
    marginLeft: 10,
  },
  nonWorkingTitleBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
export const DoctorInfo = withSafeArea(DoctorInfoComponent);
