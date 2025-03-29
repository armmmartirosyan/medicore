import React, {useState} from 'react';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, StyleSheet, Pressable} from 'react-native';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {InputWrapperView, HeadText, Button} from '@components';
import {COLORS} from '@constants';
import {withSafeArea} from '@hoc';
import {getSize} from '@utils';

function WeekDaysScheduleComponent() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <InputWrapperView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.wrapper}>
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
        <View>{/*  */}</View>
      </View>
      <View style={styles.view}>
        <Button
          onPress={() => setModalVisible(true)}
          // isLoading={isLoading}
          style={styles.button}>
          Add
        </Button>
      </View>
    </InputWrapperView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getSize(20),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export const WeekDaysSchedule = withSafeArea(WeekDaysScheduleComponent);
