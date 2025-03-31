import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faTrash} from '@fortawesome/free-solid-svg-icons';
import {HeadText} from '@components';
import {COLORS, FONTS, ACTIVE_BTN_OPACITY} from '@constants';
import {withSafeArea} from '@hoc';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useDeleteMedicine} from '@api-hooks';
import {useAuthToken} from '@hooks';
import {getSize} from '@utils';

function MedicineDetailsComponent({route, navigation}) {
  const {
    id,
    name,
    dose,
    startDate,
    dayCount,
    quantity,
    notes,
    doctor,
    onSuccess,
  } = route.params;
  const {isDoctor} = useAuthToken();

  const {mutate: deleteMedicine} = useDeleteMedicine({
    onSuccess: () => {
      onSuccess();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The medicine deleted successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to delete the medicine.',
      });
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={getSize(20)}
          />
        </Pressable>
        <HeadText>Medicine Details</HeadText>
        <View />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dose:</Text>
          <Text style={styles.value}>{dose}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{startDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Day Count:</Text>
          <Text style={styles.value}>{dayCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{quantity}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notes}>{notes || 'No notes provided.'}</Text>
      </View>

      {doctor && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prescribed by</Text>
          <Text style={styles.doctorName}>
            {doctor.firstName} {doctor.lastName}
          </Text>
        </View>
      )}

      {isDoctor && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={() => deleteMedicine(id)}
            style={styles.action}>
            <FontAwesomeIcon icon={faTrash} color="white" size={getSize(15)} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getSize(20),
    paddingTop: getSize(20),
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  card: {
    backgroundColor: COLORS.SOLITUDE_BLUE,
    borderRadius: getSize(12),
    padding: getSize(16),
    marginBottom: getSize(16),
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
  title: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: getSize(20),
    fontWeight: 'bold',
    marginBottom: getSize(8),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getSize(8),
  },
  label: {
    fontWeight: '600',
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
    fontSize: getSize(16),
  },
  value: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.PROFOUND_BLACK,
    fontSize: getSize(16),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PRIMARY_BLUE,
    fontSize: getSize(18),
    marginBottom: getSize(8),
  },
  notes: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: getSize(16),
  },
  doctorName: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: getSize(16),
  },
  action: {
    width: getSize(40),
    height: getSize(40),
    borderRadius: getSize(25),
    backgroundColor: COLORS.RED,
    flexDirection: 'row',
    alignItems: 'center',
    padding: getSize(10),
    justifyContent: 'center',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: getSize(20),
    width: '100%',
    alignItems: 'center',
  },
});

export const MedicineDetails = withSafeArea(MedicineDetailsComponent);
