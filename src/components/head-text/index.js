import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export const HeadText = memo(({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
});

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: getSize(24),
    color: COLORS.PRIMARY_BLUE,
    fontWeight: '600',
  },
});
