import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import {VisitCard, HeadText} from '@components';
import {useGetVisits} from '@api-hooks';
import {withSafeArea} from '@hoc';

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
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf('week'),
  );

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

  const {date: visits} = useGetVisits(currentWeekStart);

  console.log({visits});

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

      <FlatList
        data={weekDays}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
        bounces={false}
        renderItem={({item}) => <VisitCard item={item} visits={MOCK} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  angle: {
    color: COLORS.PRIMARY_BLUE,
  },
});

export const Visits = withSafeArea(VisitsComponent);
