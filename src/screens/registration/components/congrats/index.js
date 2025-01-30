import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
  StatusBar,
} from 'react-native';
import {getSize, screenWidth, screenHeight} from '@utils';
import {FONTS, COLORS} from '@constants';
import {useAuth} from '@contexts';
import {LogoWhite} from '@icons';

export function Congrats({onPrevStep}) {
  const {signIn} = useAuth();

  useEffect(() => {
    setTimeout(async () => {
      // signIn();
      console.log('Congrats');
    }, 1000);
  }, []);

  return (
    <Modal isTVSelectable={true}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Pressable onPress={onPrevStep}>
        <View style={styles.wrapper}>
          <LogoWhite style={styles.logo} />
          <Text style={styles.name}>Medi{'\n'}Core</Text>
        </View>
      </Pressable>
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
