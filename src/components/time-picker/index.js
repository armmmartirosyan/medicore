import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {TimerPickerModal} from 'react-native-timer-picker';
import {ACTIVE_BTN_OPACITY} from '@constants';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export function TimePicker({
  onChange = () => {},
  placeholder = '',
  containerStyle,
  value,
  label,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  const handleConfirm = time => {
    onChange(time);
    close();
  };

  const showValue = useMemo(() => {
    if (!value || !value.hours) {
      return '';
    }

    const hours = value.hours < 10 ? '0' + value.hours : value.hours;
    const minutes = value.minutes < 10 ? '0' + value.minutes : value.minutes;

    return `${hours} : ${minutes}`;
  }, [value]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={open}
        style={styles.openButton}
        activeOpacity={ACTIVE_BTN_OPACITY}>
        <Text style={[styles.openButtonText, showValue ? styles.hasValue : {}]}>
          {showValue || placeholder}
        </Text>
      </TouchableOpacity>
      <TimerPickerModal
        hideSeconds
        onCancel={close}
        closeOnOverlayPress
        visible={isVisible}
        modalTitle={placeholder}
        onConfirm={handleConfirm}
        setIsVisible={setIsVisible}
        styles={styles.timePickerStypes}
        buttonTouchableOpacityProps={{
          activeOpacity: ACTIVE_BTN_OPACITY,
        }}
      />
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
  timePickerTitle: {
    color: 'red',
  },
  timePickerStypes: {
    theme: 'light',
    confirmButton: {
      borderColor: COLORS.PRIMARY_BLUE,
      fontSize: getSize(18),
      color: COLORS.PRIMARY_BLUE,
      fontFamily: FONTS.REGULAR,
    },
    cancelButton: {
      borderColor: COLORS.PLACEHOLDER_BLUE,
      fontSize: getSize(18),
      color: COLORS.PLACEHOLDER_BLUE,
      fontFamily: FONTS.REGULAR,
    },
  },
});
