import React, {useMemo} from 'react';
import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {HeadText, Button} from '@components';
import {COLORS, FONTS, WEEK_DAYS} from '@constants';
import {getSize} from '@utils';

export function WeekScheduleModal({schedule, visible, onClose}) {
  const localSchedule = useMemo(() => {
    const daysSchedule = schedule.map(item => ({
      ...item,
      day: WEEK_DAYS.find(day => day.id === item.weekDayId).day,
    }));

    WEEK_DAYS.forEach(element => {
      const is = daysSchedule.some(i => i.weekDayId === element.id);

      if (is) {
        return daysSchedule;
      }

      daysSchedule.push({
        id: element.id,
        startTime: 'Closed',
        day: element.day,
      });
    });

    return daysSchedule;
  }, [schedule]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <HeadText style={styles.modalTitle}>
            Doctor's Weekly Schedule
          </HeadText>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {localSchedule.map((item, index) => (
              <View style={styles.scheduleItem} key={index}>
                <View style={styles.dayContainer}>
                  <FontAwesomeIcon
                    size={getSize(12)}
                    icon={faCircle}
                    color={item.startTime === 'Closed' ? '#D9534F' : '#4CAF50'}
                  />
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
                <Text style={styles.timeText}>
                  {item.startTime === 'Closed'
                    ? 'Closed'
                    : `${item.startTime} - ${item.endTime}`}
                </Text>
              </View>
            ))}
          </ScrollView>
          <Button
            style={styles.closeButton}
            textStyle={styles.textStyle}
            onPress={onClose}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: getSize(16),
    padding: getSize(20),
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: getSize(2)},
    shadowRadius: getSize(8),
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: getSize(16),
  },
  scrollContent: {
    paddingVertical: getSize(8),
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getSize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    marginLeft: getSize(8),
    fontSize: getSize(16),
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
  },
  timeText: {
    fontSize: getSize(14),
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
  },
  closeButton: {
    marginTop: getSize(16),
    height: getSize(40),
    width: '100%',
  },
  textStyle: {
    fontSize: getSize(18),
  },
});
