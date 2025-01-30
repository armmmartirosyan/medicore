import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getSize} from '@utils';
import {useSteps} from './hooks';
import {useDispatch} from 'react-redux';
import {resetRegistrationState} from '@store/registration';

export function Registration() {
  const {StepComponent} = useSteps();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRegistrationState());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StepComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: getSize(20),
  },
});
