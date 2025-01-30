import React, {memo, useState} from 'react';
import {StyleSheet, TextInput, View, Pressable, Text} from 'react-native';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';
import {Eye, EyeOpen} from '@icons';

export const PasswordInput = memo(({label, style, containerStyle, ...rest}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, styles.placeholderStyle, style]}
          placeholderTextColor={COLORS.PLACEHOLDER_BLUE}
          secureTextEntry={!showPassword}
          autoCorrect={false}
          {...rest}
        />
        <Pressable
          style={styles.eyeContainer}
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye /> : <EyeOpen style={styles.eye} />}
        </Pressable>
      </View>
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
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  eyeContainer: {
    position: 'absolute',
    top: getSize(16),
    right: getSize(13),
  },
  eye: {
    width: 22,
    height: 22,
  },
});
