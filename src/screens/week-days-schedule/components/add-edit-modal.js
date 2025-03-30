import React, {useEffect, useState} from 'react';
import {View, Modal, StyleSheet, Pressable} from 'react-native';
import {HeadText, InputWrapperView, Button, TimePicker} from '@components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {useAddWeekDay, useUpdateWeekDay} from '@api-hooks';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {normalizeTime} from '@utils';

export function AddEditModal({closeModal, selectedDay}) {
  const [startTime, setStartTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const [endTime, setEndTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const [breakStartTime, setBreakStartTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const [breakEndTime, setBreakEndTime] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (selectedDay?.info) {
      setStartTime({
        hours: selectedDay.info.startTime.slice(0, 2),
        minutes: selectedDay.info.startTime.slice(3, 5),
      });

      setEndTime({
        hours: selectedDay.info.endTime.slice(0, 2),
        minutes: selectedDay.info.endTime.slice(3, 5),
      });

      setBreakStartTime({
        hours: selectedDay.info.breakStartTime.slice(0, 2),
        minutes: selectedDay.info.breakStartTime.slice(3, 5),
      });

      setBreakEndTime({
        hours: selectedDay.info.breakEndTime.slice(0, 2),
        minutes: selectedDay.info.breakEndTime.slice(3, 5),
      });
    }
  }, [selectedDay]);

  const {mutate: add, isLoading: isLoadingAdd} = useAddWeekDay({
    onSuccess: () => {
      closeModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The week day schedule added successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to add the week day schedule.',
      });
    },
  });

  const {mutate: update, isLoading: isLoadingUpdate} = useUpdateWeekDay({
    onSuccess: () => {
      closeModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The week day schedule updated successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to update the week day schedule.',
      });
    },
  });

  const handleAdd = () => {
    const {hours: startTimeHour, minutes: startTimeMinutes} =
      normalizeTime(startTime);
    const {hours: endTimeHour, minutes: endTimeMinutes} =
      normalizeTime(endTime);
    const {hours: breakStartTimeHour, minutes: breakStartTimeMinutes} =
      normalizeTime(breakStartTime);
    const {hours: breakEndTimeHour, minutes: breakEndTimeMinutes} =
      normalizeTime(breakEndTime);

    const req = {
      startTime: `${startTimeHour}:${startTimeMinutes}:00`,
      endTime: `${endTimeHour}:${endTimeMinutes}:00`,
      breakStartTime: `${breakStartTimeHour}:${breakStartTimeMinutes}:00`,
      breakEndTime: `${breakEndTimeHour}:${breakEndTimeMinutes}:00`,
      weekDayId: selectedDay.id,
    };

    add(req);
  };

  const handleUpdate = () => {
    const {hours: startTimeHour, minutes: startTimeMinutes} =
      normalizeTime(startTime);
    const {hours: endTimeHour, minutes: endTimeMinutes} =
      normalizeTime(endTime);
    const {hours: breakStartTimeHour, minutes: breakStartTimeMinutes} =
      normalizeTime(breakStartTime);
    const {hours: breakEndTimeHour, minutes: breakEndTimeMinutes} =
      normalizeTime(breakEndTime);

    const req = {
      startTime: `${startTimeHour}:${startTimeMinutes}:00`,
      endTime: `${endTimeHour}:${endTimeMinutes}:00`,
      breakStartTime: `${breakStartTimeHour}:${breakStartTimeMinutes}:00`,
      breakEndTime: `${breakEndTimeHour}:${breakEndTimeMinutes}:00`,
      id: selectedDay.info.id,
    };

    update(req);
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      style={styles.modal}>
      <InputWrapperView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headWrapper}>
            <HeadText>{selectedDay.day} schedule</HeadText>
            <Pressable onPress={closeModal}>
              <FontAwesomeIcon icon={faXmark} size={20} color="black" />
            </Pressable>
          </View>

          <TimePicker
            value={{...startTime}}
            onChange={setStartTime}
            placeholder="Start Time"
            containerStyle={styles.input}
          />
          <TimePicker
            value={{...endTime}}
            onChange={setEndTime}
            placeholder="End Time"
            containerStyle={styles.input}
          />
          <TimePicker
            value={{...breakStartTime}}
            onChange={setBreakStartTime}
            placeholder="Break Start Time"
            containerStyle={styles.input}
          />
          <TimePicker
            value={{...breakEndTime}}
            onChange={setBreakEndTime}
            placeholder="Break End Time"
            containerStyle={styles.input}
          />

          <View style={styles.view}>
            {selectedDay.info ? (
              <Button
                isLoading={isLoadingUpdate}
                onPress={handleUpdate}
                disabled={false}>
                Update
              </Button>
            ) : (
              <Button
                isLoading={isLoadingAdd}
                onPress={handleAdd}
                disabled={false}>
                Add
              </Button>
            )}
          </View>
        </View>
      </InputWrapperView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  headWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  view: {
    width: '100%',
    alignItems: 'center',
  },
});
