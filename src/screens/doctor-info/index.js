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
  faStethoscope,
  faClinicMedical,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {HeadText, NonWorkingDate, WeekScheduleModal} from '@components';
import {COLORS, FONTS, API_BASE_URL} from '@constants';
import {withSafeArea} from '@hoc';
import {DefaultDoctor as defaultDoctor} from '@images';
import {getSize} from '@utils';

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
            size={getSize(20)}
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
                size={getSize(12)}
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
                size={getSize(12)}
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
          <View style={styles.row}>
            <FontAwesomeIcon
              icon={faStethoscope}
              color="black"
              size={getSize(15)}
            />
            <Text style={styles.specialization}>
              {doctor.doctorsSpecializations[0].specialization.name}
            </Text>
          </View>
          {doctor.clinic?.name && (
            <View style={styles.row}>
              <FontAwesomeIcon
                icon={faClinicMedical}
                color="black"
                size={getSize(15)}
              />
              <Text style={styles.specialization}>
                {doctor.clinic.name}
                {`(${doctor.clinic.address})`}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.nonWorkingTitleBlock}>
        <FontAwesomeIcon
          icon={faCalendarMinus}
          size={getSize(18)}
          color={COLORS.PRIMARY_BLUE}
        />
        <Text style={styles.nonWorkingTitle}>Non-Working Days</Text>
      </View>

      <ScrollView style={styles.nonWorkingWrapper}>
        {doctor.notWorkingDays.map(date => (
          <NonWorkingDate key={date.id} date={date} />
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
    paddingHorizontal: getSize(20),
    paddingTop: getSize(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: getSize(20),
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  inforContainer: {
    width: '100%',
    borderRadius: getSize(17),
    backgroundColor: COLORS.SECONDARY_BLUE,
    paddingVertical: getSize(18),
    paddingHorizontal: getSize(18),
    marginBottom: getSize(20),
  },
  image: {
    width: getSize(140),
    height: getSize(140),
    borderRadius: getSize(70),
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getSize(14),
  },
  infoWrapper: {
    justifyContent: 'space-around',
  },
  infoBlock: {
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(3),
    borderRadius: getSize(18),
    backgroundColor: COLORS.PRIMARY_BLUE,
    height: getSize(27),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: getSize(7),
  },
  infoName: {
    color: 'white',
    fontFamily: FONTS.REGULAR,
    fontSize: getSize(12),
    marginRight: getSize(5),
  },
  infoIcon: {
    color: 'white',
    marginRight: getSize(5),
  },
  infoValue: {
    color: 'white',
    fontFamily: FONTS.LIGHT,
    fontSize: getSize(12),
  },
  nameContainer: {
    width: '100%',
    borderRadius: getSize(13),
    backgroundColor: 'white',
    paddingVertical: getSize(10),
    alignItems: 'center',
  },
  name: {
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(15),
  },
  specialization: {
    color: 'black',
    fontFamily: FONTS.LIGHT,
    fontSize: getSize(15),
    marginLeft: getSize(8),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getSize(5),
  },
  nonWorkingTitle: {
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: getSize(18),
    marginLeft: getSize(10),
  },
  nonWorkingTitleBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getSize(10),
  },
});
export const DoctorInfo = withSafeArea(DoctorInfoComponent);
