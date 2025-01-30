import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {resetRegistrationState} from '@store/registration';
import {InputWrapperView, HeadText} from '@components';
import {COLORS} from '@constants';
import {AngleLeft} from '@icons';
import {getSize} from '@utils';
import {Email} from './email';
import {Password} from './password';
import {BirthDate} from './birth-date';
import {FinishButton} from './finish-button';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 50;

export function SecondStep({onNextStep, onPrevStep}) {
  const dispatch = useDispatch();

  const handleFinish = useCallback(() => {
    dispatch(resetRegistrationState());
    onNextStep();
  }, [dispatch, onNextStep]);

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoid}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <InputWrapperView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Pressable onPress={onPrevStep}>
            <AngleLeft style={styles.angleLeft} />
          </Pressable>
          <HeadText>Step 2</HeadText>
          <View />
        </View>
        <View style={styles.fieldsContainer}>
          <BirthDate />
          <Email />
          <Password />
          <FinishButton onNextStep={handleFinish} />
        </View>
        <View />
      </InputWrapperView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
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
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  fieldsContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
