import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FONTS, COLORS} from '@constants';
import {Button} from '@components';
import {LogoBlue} from '@icons';
import {getSize} from '@utils';

export function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.logoWrapper}>
        <LogoBlue style={styles.logo} />
        <Text style={styles.name}>Medi{'\n'}Core</Text>
      </View>
      <Text style={styles.infoText}>
        Experience streamlined healthcare management with our innovative clinic
        application, designed to simplify appointment scheduling and
        communication between doctors and patients.
      </Text>
      <View>
        <Button
          style={styles.signIn}
          onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Button>
        <Button
          variant={Button.variants.secondary}
          onPress={() => navigation.navigate('Registration')}>
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: getSize(40),
    paddingBottom: getSize(67),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  logoWrapper: {
    width: getSize(138),
    alignItems: 'center',
    marginBottom: getSize(40),
  },
  logo: {
    width: getSize(138),
    height: getSize(138),
    marginBottom: getSize(16),
  },
  name: {
    fontFamily: FONTS.THIN,
    fontSize: getSize(48),
    color: COLORS.PRIMARY_BLUE,
  },
  infoText: {
    marginBottom: getSize(32),
    fontFamily: FONTS.LIGHT,
    fontSize: getSize(14),
    color: COLORS.PROFOUND_BLACK,
    textAlign: 'center',
  },
  signIn: {
    marginBottom: getSize(7),
  },
});
