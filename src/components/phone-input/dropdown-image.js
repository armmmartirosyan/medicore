import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FONTS, COLORS} from '@constants';
import {getSize} from '@utils';

export const DropdownImage = memo(({currentCode}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>+{currentCode?.callingCode?.[0]}</Text>
      <FontAwesomeIcon style={styles.triangle} icon={faCaretDown} size={10} />
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
    color: COLORS.PRIMARY_BLUE,
    position: 'relative',
    bottom: 2,
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
