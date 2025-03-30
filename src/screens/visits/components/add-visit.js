import React, {useState} from 'react';
import {View, Modal, StyleSheet, Pressable, Text} from 'react-native';
import {
  HeadText,
  InputWrapperView,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
} from '@components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {visitSelectors} from '@store/visit/selectors';
import {changeVisitState} from '@store/visit/slice';
import {useGetDoctors, useAddVisit, useEditVisit} from '@api-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '@constants';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const INFO =
  'Before scheduling a visit, please ensure that the doctor is available on the selected date and time. Appointments scheduled during unavailable hours may be subject to rejection.';

export function AddVisit({modalVisible, closeModal}) {
  const dispatch = useDispatch();
  const visitId = useSelector(visitSelectors.visitId);
  const doctorId = useSelector(visitSelectors.doctorId);
  const startTime = useSelector(visitSelectors.startTime);
  const endTime = useSelector(visitSelectors.endTime);
  const notes = useSelector(visitSelectors.notes);
  const date = useSelector(visitSelectors.date);

  const [doctors, setDoctors] = useState([]);
  const [allowNext, setAllowNext] = useState(false);
  const [page, setPage] = useState(1);

  const {mutate: addVisit, isLoading: addIsLoading} = useAddVisit({
    onSuccess: () => {
      closeModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The visit added successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to add the visit.',
      });
    },
  });

  const {mutate: editVisit, isLoading: editIsLoading} = useEditVisit({
    onSuccess: () => {
      closeModal();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The visit edited successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data.message || 'Unable to update the visit.',
      });
    },
  });

  useGetDoctors({
    page,
    options: {
      onSuccess: data => {
        setDoctors(prev => [...prev, ...data?.data?.data]);
        setAllowNext(data?.data?.allowNext);
      },
    },
  });

  const handleValueChange = newValue => {
    dispatch(changeVisitState(newValue));
  };

  const handleEdit = () => {
    const startScheduledDate = new Date(date);
    const endScheduledDate = new Date(date);

    startScheduledDate.setHours(startTime.hours + 4, startTime.minutes);
    endScheduledDate.setHours(endTime.hours + 4, endTime.minutes);

    const req = {
      id: visitId,
      doctorId,
      notes,
      startScheduledDate,
      endScheduledDate,
    };

    editVisit(req);
  };

  const handleAdd = () => {
    const startScheduledDate = new Date(date);
    const endScheduledDate = new Date(date);

    startScheduledDate.setHours(startTime.hours + 4, startTime.minutes);
    endScheduledDate.setHours(endTime.hours + 4, endTime.minutes);

    const req = {
      doctorId,
      notes,
      startScheduledDate,
      endScheduledDate,
    };

    addVisit(req);
  };

  const handleStartTimeChange = time => {
    if (time) {
      handleValueChange({startTime: time});
    }
  };

  const handleEndTimeChange = time => {
    if (time) {
      handleValueChange({endTime: time});
    }
  };

  const handleEndReached = () => {
    if (allowNext) {
      setPage(prev => ++prev);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <InputWrapperView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headWrapper}>
            <HeadText>{visitId ? 'Edit' : 'Add'} Visit</HeadText>
            <Pressable onPress={closeModal}>
              <FontAwesomeIcon icon={faXmark} size={20} color="black" />
            </Pressable>
          </View>
          <View style={styles.infoView}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              size={20}
              color={COLORS.ACTIVE_BLUE}
            />
            <Text style={styles.infoText}>{INFO}</Text>
          </View>
          {!visitId && (
            <Select
              data={doctors}
              placeholder="Select a Doctor"
              containerStyle={styles.input}
              onScrollEndReached={handleEndReached}
              onSelect={selected => handleValueChange({doctorId: selected.id})}
              renderCurrentItem={item =>
                `${item?.firstName} ${item?.lastName}${
                  item?.clinic?.name ? ' (' + item?.clinic?.name + ')' : ''
                }`
              }
            />
          )}
          <DatePicker
            value={date}
            onDateChange={newDate => handleValueChange({date: newDate})}
            placeholder="Select a Date"
            containerStyle={styles.input}
          />

          <TimePicker
            value={{...startTime}}
            onChange={handleStartTimeChange}
            placeholder="Start Time"
            containerStyle={styles.input}
          />

          <TimePicker
            value={{...endTime}}
            onChange={handleEndTimeChange}
            placeholder="End Time"
            containerStyle={styles.input}
          />

          <Input
            value={notes}
            placeholder="Notes"
            onChangeText={newNotes => handleValueChange({notes: newNotes})}
            containerStyle={styles.input}
          />
          <View style={styles.view}>
            {visitId ? (
              <Button
                disabled={false}
                onPress={handleEdit}
                isLoading={editIsLoading}>
                Edit
              </Button>
            ) : (
              <Button
                isLoading={addIsLoading}
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
  input: {marginBottom: 20},
  view: {
    width: '100%',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.ACTIVE_BLUE,
    marginLeft: 10,
    width: '85%',
  },
});
