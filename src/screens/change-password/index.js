import React, {useMemo, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {PasswordInput, InputWrapperView, HeadText, Button} from '@components';
import {useChangeProfilePassword} from '@api-hooks';
import {COLORS, FONTS} from '@constants';
import {withSafeArea} from '@hoc';
import {getSize, isSecurePassword} from '@utils';

function ChangePasswordComponent() {
  const navigation = useNavigation();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const {mutate: changePassword, isLoading} = useChangeProfilePassword({
    onSuccess: () => {
      setCurrent('');
      setNewPass('');
      setConfirm('');
    },
  });

  const disabled = useMemo(
    () =>
      !isSecurePassword(current) ||
      !isSecurePassword(newPass) ||
      !isSecurePassword(confirm) ||
      confirm !== newPass ||
      isLoading,
    [current, newPass, confirm, isLoading],
  );

  const handleChangePassword = () => {
    changePassword({
      currentPassword: current,
      newPassword: newPass,
      confirmPassword: confirm,
    });
  };

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
            value={current}
            onChangeText={setCurrent}
            placeholder="···················"
          />
          <View style={styles.forgotWrapper}>
            <Pressable style={styles.forgetBtn}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
          </View>
          <PasswordInput
            label="New Password"
            value={newPass}
            onChangeText={setNewPass}
            placeholder="···················"
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirm}
            onChangeText={setConfirm}
            placeholder="···················"
            containerStyle={styles.input}
          />
        </View>
      </View>
      <View style={styles.view}>
        <Button
          onPress={handleChangePassword}
          disabled={disabled}
          isLoading={isLoading}
          style={styles.button}>
          Change Password
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
  view: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export const ChangePassword = withSafeArea(ChangePasswordComponent);
