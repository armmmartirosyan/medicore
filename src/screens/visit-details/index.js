import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserDoctor,
  faPhone,
  faCalendar,
  faStickyNote,
  faClipboardList,
  faAngleLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {withSafeArea} from '@hoc';
import moment from 'moment';
import {COLORS, FONTS, ACTIVE_BTN_OPACITY, VISIT_STATUSES} from '@constants';
import {HeadText} from '@components';
import {useNavigation} from '@react-navigation/native';
import {useDeleteVisit} from '@api-hooks';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useAuthToken} from '@hooks';

function VisitDetailsComponent({route}) {
  const {isPatient} = useAuthToken();
  const visit = route.params;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const enableDelete = useMemo(() => {
    const dateNow = new Date();
    const startDate = new Date(visit.startScheduledDate);

    return (
      isPatient &&
      visit.status.id === VISIT_STATUSES.PENDING &&
      startDate - dateNow
    );
  }, [isPatient, visit]);

  const {mutate} = useDeleteVisit({
    onSuccess: () => {
      goBack();

      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The visit deleted successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data.message || 'Unable to delete the visit.',
      });
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <FontAwesomeIcon
            style={styles.angleLeft}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>Visit Details</HeadText>
        <View />
      </View>
      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
        <Text style={styles.label}>Scheduled Start:</Text>
        <Text style={styles.value}>
          {moment(visit.startScheduledDate).format('DD-MM-YYYY HH:mm') || 'N/A'}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
        <Text style={styles.label}>Scheduled End:</Text>
        <Text style={styles.value}>
          {moment(visit.endScheduledDate).format('DD-MM-YYYY HH:mm') || 'N/A'}
        </Text>
      </View>

      {/* <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
        <Text style={styles.label}>Actual Start:</Text>
        <Text style={styles.value}>
          {visit.startActualDate || 'Not Available'}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faCalendar} style={styles.icon} />
        <Text style={styles.label}>Actual End:</Text>
        <Text style={styles.value}>
          {visit.endActualDate || 'Not Available'}
        </Text>
      </View> */}

      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faUserDoctor} style={styles.icon} />
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>
          {visit.doctor
            ? `${visit.doctor.firstName} ${visit.doctor.lastName}`
            : 'N/A'}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faPhone} style={styles.icon} />
        <Text style={styles.label}>Doctor Phone:</Text>
        <Text style={styles.value}>{visit.doctor?.phone || 'N/A'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faClipboardList} style={styles.icon} />
        <Text style={styles.label}>Status:</Text>
        <Text style={{...styles.value, ...styles[`value${visit.status.name}`]}}>
          {visit.status?.name || 'Unknown'}
        </Text>
      </View>

      <View style={styles.notesContainer}>
        <View style={styles.noteTitle}>
          <FontAwesomeIcon icon={faStickyNote} style={styles.icon} />
          <Text style={styles.label}>Notes:</Text>
        </View>
        <Text style={styles.value}>{visit.notes || 'No Notes'}</Text>
      </View>

      {/* {visit.visitsProcedures.length > 0 && (
        <View style={styles.detailContainer}>
          <FontAwesomeIcon icon={faClipboardList} style={styles.icon} />
          <Text style={styles.label}>Procedures:</Text>
          {visit.visitsProcedures.map((procedure, index) => (
            <Text key={index} style={styles.value}>
              {procedure.name}
            </Text>
          ))}
        </View>
      )} */}

      {enableDelete && (
        <View style={styles.trashWrapper}>
          <TouchableOpacity
            style={styles.trash}
            onPress={() => mutate(visit.id)}
            activeOpacity={ACTIVE_BTN_OPACITY}>
            <FontAwesomeIcon icon={faTrash} color={COLORS.RED} />
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
    padding: 16,
  },
  contentContainer: {
    position: 'relative',
    flex: 1,
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
  detailContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  notesContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  icon: {
    color: '#007AFF',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 16,
  },
  value: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
  },
  valueAccepted: {
    color: COLORS.PRIMARY_BLUE,
  },
  valueRejected: {
    color: COLORS.RED,
  },
  noteTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trashWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  trash: {
    borderWidth: 1,
    borderColor: COLORS.RED,
    padding: 10,
    borderRadius: 20,
  },
});

export const VisitDetails = withSafeArea(VisitDetailsComponent);
