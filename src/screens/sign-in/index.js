import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {Input, PasswordInput, InputWrapperView, HeadText} from '@components';
import {SignInButton, SignUpLink} from './components';
import {COLORS, FONTS} from '@constants';
import {getSize} from '@utils';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 50;

export function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <FontAwesomeIcon
              style={styles.angleLeft}
              icon={faAngleLeft}
              size={20}
            />
          </Pressable>
          <HeadText>Sign In</HeadText>
          <View />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Email"
            value={email}
            keyboardType="email-address"
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
            style={{marginBottom: getSize(56)}}
          />
          {/* <View style={styles.forgotWrapper}>
            <Pressable style={styles.forgetBtn}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
          </View> */}
          <SignInButton email={email} password={password} />
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  emailInput: {
    marginBottom: getSize(20),
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: getSize(56),
    paddingTop: 9,
    paddingRight: 7,
  },
  forgetText: {
    color: COLORS.PRIMARY_BLUE,
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
