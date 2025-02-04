import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PasswordInput, InputWrapperView, HeadText} from '@components';
import {COLORS, FONTS} from '@constants';
import {getSize} from '@utils';
import {withSafeArea} from '@hoc';
import {ChangeButton} from './components';

function ChangePasswordComponent() {
  const navigation = useNavigation();

  return (
    <InputWrapperView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={styles.angleLeft}
              icon={faAngleLeft}
              size={20}
            />
          </Pressable>
          <HeadText>Change Password</HeadText>
          <View />
        </View>
        <View>
          <PasswordInput
            label="Current Password"
            //   value={password}
            //   onChangeText={setPassword}
            placeholder="···················"
          />
          <View style={styles.forgotWrapper}>
            <Pressable style={styles.forgetBtn}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
          </View>
          <PasswordInput
            label="New Password"
            //   value={password}
            //   onChangeText={setPassword}
            placeholder="···················"
          />
          <PasswordInput
            label="Confirm New Password"
            //   value={password}
            //   onChangeText={setPassword}
            placeholder="···················"
            containerStyle={styles.input}
          />
        </View>
      </View>
      <ChangeButton />
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
  angleLeft: {
    color: COLORS.PRIMARY_BLUE,
  },
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: getSize(20),
    paddingTop: 9,
    paddingRight: 7,
  },
  forgetText: {
    color: COLORS.PRIMARY_BLUE,
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
  },
  input: {
    marginTop: 26,
  },
});

export const ChangePassword = withSafeArea(ChangePasswordComponent);
