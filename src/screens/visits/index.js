import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, ACTIVE_BTN_OPACITY, FONTS} from '@constants';
import {VisitCard, HeadText, Select} from '@components';
import {useGetVisits, useGetDoctors} from '@api-hooks';
import {withSafeArea} from '@hoc';
import {AddVisit} from './components';
import {resetVisitState} from '@store/visit/slice';
import {useDispatch} from 'react-redux';
import {useAuthToken} from '@hooks';

const MOCK = [
  {
    id: 1,
    doctorName: 'Dr. John Doe',
    patientId: 25,
    startScheduledDate: '2025-02-26T10:00:00.000Z',
    endScheduledDate: '2025-02-26T11:00:00.000Z',
  },
  {
    id: 2,
    doctorName: 'Dr. John Doe',
    patientId: 72,
    startScheduledDate: '2025-02-28T10:00:00.000Z',
    endScheduledDate: '2025-02-28T11:00:00.000Z',
  },
  {
    id: 4,
    doctorName: 'Dr. John Doe',
    patientId: 15,
    startScheduledDate: '2025-03-03T14:00:00.000Z',
    endScheduledDate: '2025-03-03T15:00:00.000Z',
  },
  {
    id: 3,
    doctorName: 'Dr. John Doe',
    patientId: 14,
    startScheduledDate: '2025-03-03T10:00:00.000Z',
    endScheduledDate: '2025-03-03T11:00:00.000Z',
  },
];

const VisitsComponent = () => {
  const {isPatient} = useAuthToken();
  const dispatch = useDispatch();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf('week'),
  );
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(undefined);
  const [showDoctorSelect, setShowDoctorSelect] = useState(false);
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

  const switchWeek = useCallback(direction => {
    setCurrentWeekStart(prev =>
      direction === 'prev'
        ? prev.clone().subtract(1, 'weeks')
        : prev.clone().add(1, 'weeks'),
    );
  }, []);

  const weekDays = useMemo(() => {
    return Array.from({length: 7}, (_, i) =>
      currentWeekStart.clone().add(i, 'days').format('YYYY-MM-DD'),
    );
  }, [currentWeekStart]);

  const {data: visits} = useGetVisits({
    id: selectedDoctor?.id || 0,
  });

  const closeModal = () => {
    dispatch(resetVisitState());
    setAddModalOpen(false);
  };

  const openModal = () => {
    setAddModalOpen(true);
  };

  const handleToggleDoctorSelect = () => {
    if (showDoctorSelect) {
      setSelectedDoctor(0);
    }
    setShowDoctorSelect(!showDoctorSelect);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => switchWeek('prev')}
          activeOpacity={ACTIVE_BTN_OPACITY}>
          <FontAwesomeIcon style={styles.angle} icon={faAngleLeft} size={20} />
        </TouchableOpacity>
        <HeadText>{currentWeekStart.format('MMMM YYYY')}</HeadText>
        <TouchableOpacity
          onPress={() => switchWeek('next')}
          activeOpacity={ACTIVE_BTN_OPACITY}>
          <FontAwesomeIcon style={styles.angle} icon={faAngleRight} size={20} />
        </TouchableOpacity>
      </View>

      {isPatient && (
        <View style={styles.doctorSelectBlock}>
          {showDoctorSelect && (
            <Select
              data={doctors}
              placeholder="Select a Doctor"
              containerStyle={styles.input}
              onScrollEndReached={handleEndReached}
              onSelect={setSelectedDoctor}
              renderCurrentItem={item =>
                `${item?.firstName} ${item?.lastName}${
                  item?.clinic?.name ? ' (' + item?.clinic?.name + ')' : ''
                }`
              }
            />
          )}

          <Pressable onPress={handleToggleDoctorSelect}>
            <Text style={styles.doctorDoggleText}>
              {showDoctorSelect
                ? 'Show my visits schedule'
                : "Show Doctor's visits schedule"}
            </Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={weekDays}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
        bounces={false}
        renderItem={({item}) => (
          <VisitCard
            item={item}
            visits={visits?.data || []}
            openModal={openModal}
            isPatient={isPatient}
          />
        )}
      />

      {isPatient && (
        <>
          <TouchableOpacity
            style={styles.plus}
            activeOpacity={ACTIVE_BTN_OPACITY}
            onPress={openModal}>
            <FontAwesomeIcon icon={faPlus} size={20} color="white" />
          </TouchableOpacity>
          <AddVisit modalVisible={addModalOpen} closeModal={closeModal} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listContainer: {
    paddingTop: 25,
    paddingBottom: 50,
  },
  angle: {
    color: COLORS.PRIMARY_BLUE,
  },
  plus: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.PRIMARY_BLUE,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorSelectBlock: {
    alignItems: 'center',
  },
  doctorDoggleText: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLUE,
    fontSize: 16,
    marginTop: 15,
  },
});

export const Visits = withSafeArea(VisitsComponent);
