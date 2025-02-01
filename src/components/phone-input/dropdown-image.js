import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Triangle} from '@icons';
import {getSize} from '@utils';
import {FONTS, COLORS} from '@constants';

export const DropdownImage = memo(({currentCode}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>+{currentCode?.callingCode?.[0]}</Text>
      <Triangle style={styles.triangle} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: getSize(50),
  },
  triangle: {
    width: getSize(12),
    height: 12,
    color: COLORS.PRIMARY_BLUE,
  },
  text: {
    marginRight: getSize(3),
    fontSize: getSize(12),
    fontWeight: '600',
    lineHeight: getSize(20),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.MEDIUM,
  },
});
