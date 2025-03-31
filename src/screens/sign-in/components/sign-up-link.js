import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, Pressable} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export const SignUpLink = memo(() => {
  const navigation = useNavigation();

  const handleGoToRegistration = useCallback(() => {
    navigation.navigate('Registration');
  }, [navigation]);

  return (
    <Pressable onPress={handleGoToRegistration}>
      <Text style={styles.footerText}>
        {'Don’t have an account? '}
        <Text style={styles.registerLink}>Sign Up</Text>
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
