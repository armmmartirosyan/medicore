import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ACTIVE_BTN_OPACITY, COLORS, FONTS, RADIUS_LARGE} from '@constants';
import {getSize} from '@utils';

const variants = {
  primary: 'primary',
  secondary: 'secondary',
};

const Button = memo(
  ({children, variant = variants.primary, style, textStyle, ...rest}) => {
    return (
      <TouchableOpacity
        activeOpacity={ACTIVE_BTN_OPACITY}
        style={[styles.container, styles[`${variant}Container`], style]}
        {...rest}>
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  },
);

Button.variants = variants;

const styles = StyleSheet.create({
  container: {
    width: getSize(207),
    height: getSize(45),
    paddingHorizontal: getSize(21),
    borderRadius: getSize(RADIUS_LARGE),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: COLORS.PRIMARY_BLUE,
  },
  secondaryContainer: {
    backgroundColor: COLORS.SECONDARY_BLUE,
  },
  text: {
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(24),
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: COLORS.PRIMARY_BLUE,
  },
});

export {Button};
