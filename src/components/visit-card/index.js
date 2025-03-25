import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, ACTIVE_BTN_OPACITY, VISIT_STATUSES} from '@constants';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStethoscope,
  faUser,
  faPencil,
  faHourglassHalf,
  faXmarkCircle,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {changeVisitState} from '@store/visit/slice';
import {useDispatch} from 'react-redux';
import {useEditVisit} from '@api-hooks';
import {useNavigation} from '@react-navigation/native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useAuthToken} from '@hooks';

export function VisitCard({item, visits, openModal}) {
  const {isPatient} = useAuthToken();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {mutate: editVisit} = useEditVisit({
    onSuccess: () => {
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The visit updated successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to update the visit.',
      });
    },
  });

  const filteredVisits = useMemo(() => {
    const arr = visits.filter(v => {
      const visitDate = moment(new Date(v.startScheduledDate)).format(
        'YYYY-MM-DD',
      );
      const itemDate = moment(new Date(item)).format('YYYY-MM-DD');

      return moment(itemDate).isSame(visitDate);
    });

    arr.sort((a, b) => {
      const aDate = new Date(a.startScheduledDate);
      const bDate = new Date(b.startScheduledDate);

      return aDate - bDate;
    });

    return arr;
  }, [visits, item]);

  const handleEditPress = visit => {
    const date = new Date(visit.startScheduledDate);

    dispatch(
      changeVisitState({
        date,
        visitId: visit.id,
        notes: visit.notes,
        doctorId: visit.doctor.id,
        startTime: {
          hours: date.getHours(),
          minutes: date.getMinutes(),
        },
        endTime: {
          hours: new Date(visit.endScheduledDate).getHours(),
          minutes: new Date(visit.endScheduledDate).getMinutes(),
        },
      }),
    );

    openModal();
  };

  const handleReject = visit => {
    const req = {
      id: visit.id,
      statusId: VISIT_STATUSES.REJECTED,
    };

    editVisit(req);
  };

  const handleAccept = visit => {
    const req = {
      id: visit.id,
      statusId: VISIT_STATUSES.ACCEPTED,
    };

    editVisit(req);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <Text style={styles.dayMonth}>{moment(item).format('MMM D')}</Text>
        <Text style={styles.weekDay}>{moment(item).format('dddd')}</Text>
      </View>
      {filteredVisits.length ? (
        filteredVisits.map(visit => (
          <TouchableOpacity
            key={visit.id}
            style={styles.visitCard}
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={() => navigation.navigate('VisitDetails', {...visit})}>
            <View style={styles.timeContainer}>
              <Text style={styles.startTime}>
                {moment(visit.startScheduledDate).format('HH:mm')}
              </Text>
              <Text style={styles.endTime}>
                {moment(visit.endScheduledDate).format('HH:mm')}
              </Text>
            </View>
            <View style={styles.dash} />
            {visit.doctor && (
              <View style={styles.nameContainer}>
                <View style={styles.doctorPatientNameContainer}>
                  <FontAwesomeIcon
                    icon={faStethoscope}
                    color={COLORS.PROFOUND_BLACK}
                    size={12}
                  />
                  <Text style={styles.doctorName}>
                    {visit.doctor.firstName} {visit.doctor.lastName}
                  </Text>
                </View>
                <View style={styles.doctorPatientNameContainer}>
                  <FontAwesomeIcon
                    icon={faUser}
                    color={COLORS.PROFOUND_BLACK}
                    size={12}
                  />
                  <Text style={styles.patientName}>
                    {visit.patient.firstName} {visit.patient.lastName}
                  </Text>
                </View>
              </View>
            )}
            {visit.status.id === VISIT_STATUSES.REJECTED && isPatient && (
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  color={COLORS.RED}
                  size={15}
                />
              </View>
            )}
            {visit.status.id === VISIT_STATUSES.PENDING && isPatient && (
              <>
                <View style={styles.iconWrapper}>
                  <FontAwesomeIcon
                    icon={faHourglassHalf}
                    color={COLORS.PROFOUND_BLACK}
                    size={15}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleEditPress(visit)}
                  style={styles.pencilContainer}
                  activeOpacity={ACTIVE_BTN_OPACITY}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    color={COLORS.PROFOUND_BLACK}
                    size={15}
                  />
                </TouchableOpacity>
              </>
            )}
            {!isPatient && (
              <>
                <TouchableOpacity
                  onPress={() => handleAccept(visit)}
                  style={{
                    ...styles.actionBtn,
                    ...(visit.status.id === VISIT_STATUSES.ACCEPTED
                      ? {borderWidth: 1, borderColor: COLORS.PRIMARY_BLUE}
                      : {}),
                  }}
                  activeOpacity={ACTIVE_BTN_OPACITY}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    color={COLORS.PRIMARY_BLUE}
                    size={15}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleReject(visit)}
                  style={{
                    ...styles.actionBtn,
                    ...(visit.status.id === VISIT_STATUSES.REJECTED
                      ? {borderWidth: 1, borderColor: COLORS.RED}
                      : {}),
                  }}
                  activeOpacity={ACTIVE_BTN_OPACITY}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color={COLORS.RED}
                    size={15}
                  />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noVisitText}>No Registration</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayMonth: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 18,
  },
  weekDay: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 14,
    marginLeft: 10,
  },
  noVisitText: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.GRAYISH,
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 15,
  },
  visitCard: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 70,
  },
  dash: {
    width: 2,
    height: '100%',
    backgroundColor: COLORS.ACTIVE_BLUE,
    borderRadius: 3,
  },
  nameContainer: {
    marginLeft: 15,
  },
  startTime: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
    marginBottom: 5,
  },
  endTime: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
    fontSize: 12,
  },
  doctorPatientNameContainer: {
    flexDirection: 'row',
  },
  doctorName: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  patientName: {
    fontFamily: FONTS.REGULAR,
    color: COLORS.PROFOUND_BLACK,
    fontSize: 14,
    marginLeft: 5,
  },
  pencilContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionBtn: {
    marginLeft: 40,
    padding: 5,
    borderRadius: 20,
  },
});
