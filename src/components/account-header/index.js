import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClinicMedical,
  faPencil,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import {FONTS, COLORS, ACTIVE_BTN_OPACITY, API_BASE_URL} from '@constants';
import {Profile as profile} from '@images';
import {profileSelectors} from '@store/profile';
import {useSelector} from 'react-redux';
import {ProfileImageModal} from '@components';
import {useAuthToken} from '@hooks';

export function AccountHeader({showName = true, allowChangePicture}) {
  const {isDoctor} = useAuthToken();
  const [modalVisible, setModalVisible] = useState(false);
  const firstName = useSelector(profileSelectors.fNameSelector);
  const lastName = useSelector(profileSelectors.lNameSelector);
  const imageUrl = useSelector(profileSelectors.imageSelector);
  const clinic = useSelector(profileSelectors.clinic);
  const doctorSpecializations = useSelector(
    profileSelectors.doctorSpecializations,
  );

  return (
    <View style={styles.profileHeader}>
      <Text style={styles.headerText}>My Profile</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={
            imageUrl ? {uri: `${API_BASE_URL}images/${imageUrl}`} : profile
          }
          style={styles.profilePicture}
        />
        {allowChangePicture && (
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon color="white" icon={faPencil} size={13} />
          </TouchableOpacity>
        )}
      </View>
      {showName && (
        <Text style={styles.userName}>
          {firstName} {lastName}
        </Text>
      )}
      {!showName && isDoctor && (
        <>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faStethoscope} color="black" size={15} />
            <Text style={styles.specializationClinic}>
              {doctorSpecializations?.[0]?.specialization?.name}
            </Text>
          </View>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faClinicMedical} color="black" size={15} />
            <Text style={styles.specializationClinic}>{clinic?.name}</Text>
          </View>
        </>
      )}
      <ProfileImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 24,
    marginBottom: 12,
    color: COLORS.PRIMARY_BLUE,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    position: 'relative',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  userName: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 24,
    color: 'black',
  },
  specializationClinic: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    color: 'black',
    marginLeft: 6,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: -1,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
