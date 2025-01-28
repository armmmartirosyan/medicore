import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputWrapperView} from '@components';
import {NextButton} from './next-button';
import {FirstName} from './first-name';
import {LastName} from './last-name';
import {Phone} from './phone';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 140 : 50;

export function FirstStep({onNextStep}) {
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoid}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <InputWrapperView contentContainerStyle={styles.wrapper}>
        <Text style={styles.screenName}>Registration</Text>
        <View style={styles.alignCenter}>
          <FirstName />
          <LastName />
          <Phone />
          <NextButton onNextStep={onNextStep} />
        </View>
      </InputWrapperView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  screenName: {
    fontWeight: '600',
    marginBottom: 49,
  },
});
