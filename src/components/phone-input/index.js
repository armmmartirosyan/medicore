import React, {memo, useCallback, useRef, useState} from 'react';
import {default as RNPhoneInput} from 'react-native-phone-number-input';
import {StyleSheet, View, Text} from 'react-native';
import {getSize} from '@utils';
import {DEFAULT_CODE, FONTS, COLORS} from '@constants';
import {DropdownImage} from './dropdown-image';

export const PhoneInput = memo(
  ({
    label,
    onChangeText,
    containerStyle,
    onChangeCountry,
    value = '',
    placeholder = 'Phone number',
    ...rest
  }) => {
    const phoneInput = useRef(null);
    const [currentValue, setCurrentValue] = useState(value);
    const [currentCode, setCurrentCode] = useState(DEFAULT_CODE);

    const handleChangeCountry = useCallback(
      params => {
        setCurrentCode(params);

        if (typeof onChangeCountry === 'function') {
          onChangeCountry(params);
        }
      },
      [onChangeCountry],
    );

    const handleChange = useCallback(
      newValue => {
        const reg = /^[\d]{0,15}$/;

        if (!reg.test(newValue)) {
          return;
        }

        if (typeof onChangeText === 'function') {
          onChangeText(newValue);
        }

        setCurrentValue(newValue);
      },
      [onChangeText],
    );

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <RNPhoneInput
          defaultCode="AM"
          ref={phoneInput}
          placeholder={placeholder}
          onChangeText={handleChange}
          codeTextStyle={styles.codeTextStyle}
          onChangeCountry={handleChangeCountry}
          textInputStyle={styles.textInputStyle}
          containerStyle={styles.containerStyle}
          textContainerStyle={styles.textContainerStyle}
          countryPickerButtonStyle={styles.countryPickerButtonStyle}
          renderDropdownImage={<DropdownImage currentCode={currentCode} />}
          textInputProps={{
            placeholderTextColor: COLORS.PLACEHOLDER_BLUE,
            keyboardType: 'phone-pad',
            value: currentValue,
          }}
          {...rest}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontFamily: FONTS.MEDIUM,
    fontSize: getSize(18),
    marginBottom: getSize(12),
    color: 'black',
  },
  containerStyle: {
    width: '100%',
    height: getSize(45),
    paddingHorizontal: getSize(13),
    borderRadius: getSize(13),
    backgroundColor: COLORS.SOLITUDE_BLUE,
    overflow: 'hidden',
  },
  codeTextStyle: {
    display: 'none',
  },
  countryPickerButtonStyle: {
    width: getSize(90),
  },
  textInputStyle: {
    fontSize: getSize(18),
    color: COLORS.PRIMARY_BLUE,
    fontFamily: FONTS.REGULAR,
    paddingVertical: 0,
  },
  textContainerStyle: {
    paddingVertical: 0,
    backgroundColor: COLORS.SOLITUDE_BLUE,
  },
});
