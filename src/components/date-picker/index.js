import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {ACTIVE_BTN_OPACITY} from '@constants';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export function DatePicker({
  placeholder = 'DD / MM /YYY',
  containerStyle,
  onDateChange,
  value,
  label,
  ...rest
}) {
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const openCalendar = () => setCalendarVisible(true);
  const closeCalendar = () => setCalendarVisible(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={openCalendar}
        style={styles.openButton}
        activeOpacity={ACTIVE_BTN_OPACITY}>
        <Text style={[styles.openButtonText, value ? styles.hasValue : {}]}>
          {new Date(value).toDateString() || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isCalendarVisible}
        animationType="fade"
        onRequestClose={closeCalendar}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.VIBRANT_BLUE}
        />
        <TouchableWithoutFeedback onPress={closeCalendar}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <CalendarPicker
                  startFromMonday
                  showDayStragglers
                  onDateChange={onDateChange}
                  selectedDayTextColor="white"
                  todayBackgroundColor={COLORS.VIBRANT_BLUE}
                  disabledDatesTextStyle={styles.disabledDatesTextStyle}
                  monthTitleStyle={styles.monthYearTitleStyle}
                  yearTitleStyle={styles.monthYearTitleStyle}
                  selectedDayStyle={styles.selectedDayStyle}
                  todayTextStyle={styles.todayTextStyle}
                  textStyle={styles.textStyle}
                  selectedStartDate={value}
                  previousTitleStyle={styles.nextPrevStyle}
                  nextTitleStyle={styles.nextPrevStyle}
                  previousTitle="⟨"
                  nextTitle="⟩"
                  {...rest}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(18),
    marginBottom: getSize(12),
    color: 'black',
  },
  openButton: {
    width: '100%',
    height: getSize(45),
    paddingVertical: 0,
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    justifyContent: 'center',
  },
  openButtonText: {
    fontSize: getSize(18),
    color: COLORS.PLACEHOLDER_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  hasValue: {
    color: COLORS.PRIMARY_BLUE,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.VIBRANT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: getSize(30),
    padding: getSize(15),
  },
  monthYearTitleStyle: {
    fontSize: getSize(18),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  textStyle: {
    fontSize: getSize(16),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  disabledDatesTextStyle: {
    fontSize: getSize(12),
    color: COLORS.VERY_SOFT_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  todayTextStyle: {
    color: 'white',
    fontFamily: FONTS.REGULAR,
  },
  selectedDayStyle: {
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  nextPrevStyle: {
    fontSize: getSize(16),
  },
});
