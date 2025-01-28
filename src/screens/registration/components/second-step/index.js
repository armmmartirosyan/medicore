import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {InputWrapperView} from '@components';
import {resetRegistrationState} from '@store/registration';
import {getSize} from '@utils';
import {Email} from './email';
import {Password} from './password';
import {BirthDate} from './birth-date';
import {FinishButton} from './finish-button';

export function SecondStep({onNextStep, onPrevStep}) {
  const dispatch = useDispatch();

  const handleFinish = useCallback(() => {
    dispatch(resetRegistrationState());
    onNextStep();
  }, [dispatch, onNextStep]);

  return (
    <InputWrapperView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        <Pressable onPress={onPrevStep}>
          <Text>Back</Text>
        </Pressable>
        <BirthDate />
        <Email />
        <Password />
      </View>
      <FinishButton onNextStep={handleFinish} />
    </InputWrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowLeft: {
    position: 'relative',
    right: getSize(4),
    marginBottom: 19,
  },
  title: {
    marginBottom: 66,
  },
  contentWrapper: {
    width: '100%',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
    marginBottom: 10,
    color: 'blue',
  },
});
