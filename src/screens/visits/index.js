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
import {getSize} from '@utils';

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
          <FontAwesomeIcon
            style={styles.angle}
            icon={faAngleLeft}
            size={getSize(20)}
          />
        </TouchableOpacity>
        <HeadText>{currentWeekStart.format('MMMM YYYY')}</HeadText>
        <TouchableOpacity
          onPress={() => switchWeek('next')}
          activeOpacity={ACTIVE_BTN_OPACITY}>
          <FontAwesomeIcon
            style={styles.angle}
            icon={faAngleRight}
            size={getSize(20)}
          />
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
    padding: getSize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getSize(10),
  },
  listContainer: {
    paddingTop: getSize(25),
    paddingBottom: getSize(50),
  },
  angle: {
    color: COLORS.PRIMARY_BLUE,
  },
  plus: {
    position: 'absolute',
    bottom: getSize(20),
    right: getSize(20),
    backgroundColor: COLORS.PRIMARY_BLUE,
    width: getSize(50),
    height: getSize(50),
    borderRadius: getSize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorSelectBlock: {
    alignItems: 'center',
  },
  doctorDoggleText: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.PRIMARY_BLUE,
    fontSize: getSize(16),
    marginTop: getSize(15),
  },
});

export const Visits = withSafeArea(VisitsComponent);
