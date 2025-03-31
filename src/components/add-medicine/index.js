import React from 'react';
import {View, Modal, StyleSheet, Pressable} from 'react-native';
import {
  HeadText,
  InputWrapperView,
  Button,
  Input,
  DatePicker,
} from '@components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {medicinesSelectors} from '@store/medicines/selectors';
import {
  changeMedicinesState,
  resetMedicinesState,
} from '@store/medicines/slice';
import {useAddMedicine} from '@api-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS} from '@constants';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {getSize} from '@utils';
import moment from 'moment';
import {useQueryClient} from 'react-query';

export function AddMedicine({modalVisible, closeModal, visitProcedure}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const notes = useSelector(medicinesSelectors.notes);
  const name = useSelector(medicinesSelectors.name);
  const dose = useSelector(medicinesSelectors.dose);
  const quantity = useSelector(medicinesSelectors.quantity);
  const dayCount = useSelector(medicinesSelectors.dayCount);
  const startDate = useSelector(medicinesSelectors.startDate);

  const handleClose = () => {
    dispatch(resetMedicinesState());
    closeModal();
  };

  const {mutate: add, isLoading} = useAddMedicine({
    onSuccess: () => {
      queryClient.invalidateQueries(['get-visit-procedure-by-id']);
      handleClose();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The medicine added successfully!',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to add the medicine.',
      });
    },
  });

  const handleValueChange = newValue => {
    dispatch(changeMedicinesState(newValue));
  };

  const handleAdd = () => {
    const req = {
      notes,
      name,
      dose,
      quantity,
      dayCount,
      startDate,
      visitProcedureId: visitProcedure.id,
      patientId: visitProcedure.visit.patientId,
      doctorId: visitProcedure.visit.doctorId,
    };

    add(req);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      style={styles.modal}>
      <InputWrapperView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headWrapper}>
            <HeadText>Add Medicine</HeadText>
            <Pressable onPress={handleClose}>
              <FontAwesomeIcon
                icon={faXmark}
                size={getSize(20)}
                color="black"
              />
            </Pressable>
          </View>
          <Input
            value={name}
            placeholder="Name"
            onChangeText={newValue => handleValueChange({name: newValue})}
            containerStyle={styles.input}
          />
          <Input
            value={dose}
            placeholder="Dose"
            onChangeText={newValue => handleValueChange({dose: newValue})}
            containerStyle={styles.input}
          />
          <DatePicker
            value={startDate}
            placeholder="Start date"
            containerStyle={styles.input}
            onDateChange={newDate => {
              const date = moment(newDate).format('YYYY-MM-DD');

              handleValueChange({startDate: date});
            }}
          />
          <Input
            value={quantity}
            placeholder="Quantity"
            onChangeText={newValue => handleValueChange({quantity: newValue})}
            containerStyle={styles.input}
            keyboardType="phone-pad"
          />
          <Input
            value={dayCount}
            placeholder="Day Count"
            onChangeText={newValue => handleValueChange({dayCount: newValue})}
            containerStyle={styles.input}
            keyboardType="phone-pad"
          />
          <Input
            value={notes}
            placeholder="Notes"
            onChangeText={newNotes => handleValueChange({notes: newNotes})}
            containerStyle={styles.input}
          />

          <View style={styles.view}>
            <Button isLoading={isLoading} onPress={handleAdd} disabled={false}>
              Add
            </Button>
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
    padding: getSize(20),
    backgroundColor: '#fff',
    borderRadius: getSize(20),
  },
  headWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getSize(20),
  },
  input: {marginBottom: getSize(20)},
  view: {
    width: '100%',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    marginBottom: getSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.ACTIVE_BLUE,
    marginLeft: getSize(10),
    width: '85%',
  },
  imageUploadBtn: {
    width: '100%',
    height: getSize(45),
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    marginBottom: getSize(20),
    justifyContent: 'center',
  },
  imageUploadText: {
    fontSize: getSize(18),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  scrollContent: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: getSize(20),
  },
  image: {
    width: '100%',
    height: getSize(100),
  },
  removeImage: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
