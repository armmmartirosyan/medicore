import React from 'react';
import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {HeadText, Button} from '@components';
import {COLORS, FONTS} from '@constants';

export function WeekScheduleModal({schedule, visible, onClose}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <HeadText style={styles.modalTitle}>
            Doctor's Weekly Schedule
          </HeadText>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {schedule.map((item, index) => (
              <View style={styles.scheduleItem} key={index}>
                <View style={styles.dayContainer}>
                  <FontAwesomeIcon
                    size={12}
                    icon={faCircle}
                    color={item.start === 'Closed' ? '#D9534F' : '#4CAF50'}
                  />
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
                <Text style={styles.timeText}>
                  {item.start === 'Closed'
                    ? 'Closed'
                    : `${item.start} - ${item.end}`}
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
    borderRadius: 16,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.PROFOUND_BLACK,
  },
  timeText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAYISH,
  },
  closeButton: {
    marginTop: 16,
    height: 40,
    width: '100%',
  },
  textStyle: {
    fontSize: 18,
  },
});
