import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Triangle} from '@icons';
import {getSize} from '@utils';

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
    color: 'black',
  },
  text: {
    marginRight: 3,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    color: 'black',
  },
});
