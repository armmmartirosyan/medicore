import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  Pressable,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputWrapperView, HeadText} from '@components';
import {COLORS} from '@constants';
import {getSize} from '@utils';
import {SignInLink} from './sign-in-link';
import {NextButton} from './next-button';
import {FirstName} from './first-name';
import {LastName} from './last-name';
import {Phone} from './phone';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 50;

export function FirstStep({onNextStep}) {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoid}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <InputWrapperView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={styles.angleLeft}
              icon={faAngleLeft}
              size={20}
            />
          </Pressable>
          <HeadText>Sign Up</HeadText>
          <View />
        </View>
        <View style={styles.fieldsContainer}>
          <FirstName />
          <LastName />
          <Phone />
          <NextButton onNextStep={onNextStep} />
          <SignInLink />
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
