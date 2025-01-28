import React, {memo, useCallback, useRef, useState} from 'react';
import {default as RNPhoneInput} from 'react-native-phone-number-input';
import {StyleSheet} from 'react-native';
import {getSize} from '@utils';
import {DEFAULT_CODE} from '@constants';
import {DropdownImage} from './dropdown-image';

export const PhoneInput = memo(
  ({
    placeholder = 'phone number',
    onChangeCountry,
    onChangeText,
    value = '',
    containerStyle,
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
        const reg = /^[\d]*$/;

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
      <RNPhoneInput
        defaultCode="AM"
        ref={phoneInput}
        placeholder={placeholder}
        onChangeText={handleChange}
        codeTextStyle={styles.codeTextStyle}
        onChangeCountry={handleChangeCountry}
        textInputStyle={styles.textInputStyle}
        textContainerStyle={styles.textContainerStyle}
        containerStyle={[styles.containerStyle, containerStyle]}
        countryPickerButtonStyle={styles.countryPickerButtonStyle}
        renderDropdownImage={<DropdownImage currentCode={currentCode} />}
        textInputProps={{
          placeholderTextColor: 'grey',
          keyboardType: 'phone-pad',
          value: currentValue,
        }}
        {...rest}
      />
    );
  },
);

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 56,
    width: getSize(317),
    paddingHorizontal: getSize(8),
  },
  codeTextStyle: {
    display: 'none',
  },
  countryPickerButtonStyle: {
    width: getSize(90),
  },
  textInputStyle: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 0,
  },
  textContainerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: getSize(2),
  },
});
