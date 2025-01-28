import React, {memo} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export const Input = memo(({label, containerStyle, style, ...rest}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, styles.placeholderStyle, style]}
        placeholderTextColor={COLORS.PLACEHOLDER_BLUE}
        autoCorrect={false}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(18),
    marginBottom: getSize(12),
    color: 'black',
  },
  input: {
    width: '100%',
    paddingVertical: getSize(15),
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    fontSize: getSize(18),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
  },
  placeholderStyle: {
    fontSize: getSize(18),
    fontFamily: FONTS.REGULAR,
  },
});
