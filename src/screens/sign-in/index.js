import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, PasswordInput, InputWrapperView, HeadText} from '@components';
import {SignInButton, SignUpLink} from './components';
import {useFieldValues} from './hooks';
import {COLORS} from '@constants';
import {AngleLeft} from '@icons';
import {getSize} from '@utils';
import {FONTS} from '@constants';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 50;

export function SignIn() {
  const navigation = useNavigation();

  const {email, password, disableSignIn, setEmail, setPassword} =
    useFieldValues();

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoid}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <InputWrapperView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <AngleLeft style={styles.angleLeft} />
          </Pressable>
          <HeadText>Sign In</HeadText>
          <View />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Email"
            value={email}
            inputMode="email"
            onChangeText={setEmail}
            placeholder="example@example.com"
            containerStyle={styles.emailInput}
          />
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="···················"
            containerStyle={styles.passwordInput}
          />
          <Pressable style={styles.forgetBtn}>
            <Text style={styles.forgetText}>Forgot Password</Text>
          </Pressable>
          <SignInButton
            email={email}
            password={password}
            disableSignIn={disableSignIn}
          />
          <SignUpLink />
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
  },
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  title: {
    fontSize: getSize(32),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: getSize(20),
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  emailInput: {
    marginBottom: getSize(20),
  },
  passwordInput: {
    marginBottom: getSize(56),
  },
  forgetBtn: {
    position: 'absolute',
    top: getSize(180),
    right: 10,
  },
  forgetText: {
    color: COLORS.PRIMARY_BLUE,
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
