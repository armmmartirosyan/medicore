import React, {useMemo, useState} from 'react';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  faAngleLeft,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {HeadText} from '@components';
import {COLORS, WEEK_DAYS, FONTS, ACTIVE_BTN_OPACITY} from '@constants';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';
import {useSelector} from 'react-redux';
import {profileSelectors} from '@store/profile';
import {useGetWeekDays, useRemoveWeekDay} from '@api-hooks';
import {AddEditModal} from './components';

function WeekDaysScheduleComponent() {
  const navigation = useNavigation();
  const id = useSelector(profileSelectors.id);
  const [selectedDay, setSelectedDay] = useState(null);

  const {data: weekDays} = useGetWeekDays({id});

  const data = useMemo(() => {
    if (!weekDays?.data) {
      return WEEK_DAYS;
    }

    return WEEK_DAYS.map(day => ({
      ...day,
      info: weekDays.data.find(item => item.weekDay.id === day.id),
    }));
  }, [weekDays]);

  const openModal = day => {
    setSelectedDay(day);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  const {mutate: remove, isLoading: isLoadingRemove} = useRemoveWeekDay({
    onSuccess: () => {
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The week day schedule removed successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to remove the week day schedule.',
      });
    },
  });

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.weekDayNameWrapper}>
          <Text style={styles.dayText}>{item.day}</Text>
          {item.info && (
            <View style={styles.dayActionsWrapper}>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => openModal(item)}
                activeOpacity={ACTIVE_BTN_OPACITY}>
                <FontAwesomeIcon icon={faPencil} color="white" size={10} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.trashBtn}
                onPress={() => remove(item.info.id)}
                activeOpacity={ACTIVE_BTN_OPACITY}>
                <FontAwesomeIcon icon={faTrash} color="white" size={10} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {item.info ? (
          <>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                Start: {item.info.startTime?.slice(0, 5)}
              </Text>
              <Text style={styles.timeText}>
                End: {item.info.endTime?.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.breakText}>
                Break: {item.info.breakStartTime?.slice(0, 5)} -{' '}
                {item.info.breakEndTime?.slice(0, 5)}
              </Text>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => openModal(item)}
            activeOpacity={ACTIVE_BTN_OPACITY}>
            <FontAwesomeIcon icon={faPlus} color="white" size={20} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            color={COLORS.PRIMARY_BLUE}
            icon={faAngleLeft}
            size={20}
          />
        </Pressable>
        <HeadText>Week Days Schedule</HeadText>
        <View />
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      {!!selectedDay && (
        <AddEditModal closeModal={closeModal} selectedDay={selectedDay} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: getSize(20),
    paddingHorizontal: getSize(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 45,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  dayText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_BLUE,
  },
  weekDayNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  dayActionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: '#555',
  },
  breakText: {
    fontFamily: FONTS.LIGHT,
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  plusBtn: {
    width: '100%',
    height: 30,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  trashBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export const WeekDaysSchedule = withSafeArea(WeekDaysScheduleComponent);
