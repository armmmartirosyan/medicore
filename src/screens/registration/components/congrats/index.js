import React, {useEffect} from 'react';
import {StyleSheet, View, Modal, Text, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getSize, screenWidth, screenHeight} from '@utils';
import {FONTS, COLORS} from '@constants';
import {useAuth} from '@contexts';
import {LogoWhite} from '@icons';
import {
  registrationSelectors,
  resetRegistrationState,
} from '@store/registration';

export function Congrats() {
  const {signIn} = useAuth();
  const dispatch = useDispatch();
  const token = useSelector(registrationSelectors.signUpTokenSelector);

  useEffect(() => {
    if (token) {
      setTimeout(async () => {
        await signIn(token);
        dispatch(resetRegistrationState());
      }, 2000);
    }
  }, [token]);

  if (!token) {
    return <></>;
  }

  return (
    <Modal isTVSelectable={true} animationType="fade">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.PRIMARY_BLUE}
      />
      <View style={styles.wrapper}>
        <LogoWhite style={styles.logo} />
        <Text style={styles.name}>Medi{'\n'}Core</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  logo: {
    width: getSize(138),
    height: getSize(138),
    marginBottom: getSize(16),
  },
  name: {
    fontFamily: FONTS.THIN,
    fontSize: getSize(48),
    color: 'white',
  },
});
