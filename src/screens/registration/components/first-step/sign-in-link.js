import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, Pressable} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export const SignInLink = memo(() => {
  const navigation = useNavigation();

  const handleGoToRegistration = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Pressable onPress={handleGoToRegistration}>
      <Text style={styles.footerText}>
        {'Already have an account? '}
        <Text style={styles.registerLink}>Sign In</Text>
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  footerText: {
    fontFamily: FONTS.LIGHT,
    color: COLORS.PROFOUND_BLACK,
    fontSize: getSize(14),
  },
  registerLink: {
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.SEMI_BOLD,
  },
});
