import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSteps} from './hooks';

export function Registration() {
  const {StepComponent} = useSteps();

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
    padding: 20,
  },
});
