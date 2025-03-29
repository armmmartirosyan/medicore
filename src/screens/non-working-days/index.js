import React, {useCallback, useMemo, useState} from 'react';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {faAngleLeft, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {DatePicker, HeadText, Button, NonWorkingDate} from '@components';
import {COLORS, ACTIVE_BTN_OPACITY} from '@constants';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';
import {
  useGetMyNonWorkings,
  useDeleteNonWorking,
  useAddNonWorking,
} from '@api-hooks';
import moment from 'moment';

function NonWorkingDaysComponent() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);

  const {data: nonWorkings} = useGetMyNonWorkings();

  const {mutate: deleteNonWorking} = useDeleteNonWorking({
    onSuccess: () => {
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The non-working date deleted successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to delete the non-working date.',
      });
    },
  });

  const {mutate: addNonWorking, isLoading: isLoadingAdd} = useAddNonWorking({
    onSuccess: () => {
      handleClose();
      Toast.show({
        autoClose: 2000,
        title: 'Done',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'The non-working date added successfully.',
      });
    },
    onError: e => {
      Toast.show({
        autoClose: 2000,
        title: 'Fail',
        type: ALERT_TYPE.DANGER,
        textBody: e?.data?.message || 'Unable to add the non-working date.',
      });
    },
  });

  const handleClose = () => {
    setModalVisible(false);
    setDate(null);
  };

  const handleAdd = () => {
    addNonWorking({notWorkDate: date});
  };

  const disabledDates = useMemo(() => {
    if (!nonWorkings?.data) {
      return [];
    }

    return nonWorkings.data.map(item => new Date(item.notWorkDate));
  }, [nonWorkings]);

  const tomorrow = useMemo(() => {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    return currentDate;
  }, []);

  const allowDelete = useCallback(
    date => {
      const first = new Date(tomorrow);
      const second = new Date(date.notWorkDate);

      first.setHours(0, 0, 0, 0);
      second.setHours(0, 0, 0, 0);

      return first <= second;
    },
    [tomorrow],
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              color={COLORS.PRIMARY_BLUE}
              icon={faAngleLeft}
              size={20}
            />
          </Pressable>
          <HeadText>Non-working days</HeadText>
          <View />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}>
          {nonWorkings?.data?.map(date => (
            <View style={styles.row} key={date.id}>
              <NonWorkingDate date={date} style={{width: '70%'}} />
              {allowDelete(date) ? (
                <TouchableOpacity
                  activeOpacity={ACTIVE_BTN_OPACITY}
                  onPress={() => deleteNonWorking(date.id)}
                  style={styles.xMark}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color={COLORS.RED}
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{width: 20}} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          activeOpacity={ACTIVE_BTN_OPACITY}
          onPress={() => setModalVisible(true)}
          style={styles.plus}>
          <FontAwesomeIcon icon={faPlus} color="white" size={20} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        style={styles.modal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.headWrapper}>
              <HeadText>Add non-working date</HeadText>
              <Pressable onPress={handleClose}>
                <FontAwesomeIcon icon={faXmark} size={20} color="black" />
              </Pressable>
            </View>
            <DatePicker
              value={date}
              placeholder="Date"
              containerStyle={styles.input}
              onDateChange={newDate => {
                setDate(moment(newDate).format('YYYY-MM-DD'));
              }}
              disabledDates={disabledDates}
              minDate={tomorrow}
            />

            <View style={styles.view}>
              <Button
                isLoading={isLoadingAdd}
                onPress={handleAdd}
                disabled={false}>
                Add
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getSize(20),
    paddingTop: getSize(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 45,
  },
  view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  scrollViewContainer: {
    width: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  xMark: {
    marginTop: 5,
  },
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
  },
  plus: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.PRIMARY_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
});

export const NonWorkingDays = withSafeArea(NonWorkingDaysComponent);
