import React from 'react';
import {StyleSheet} from 'react-native';
import {getSize} from '@utils';

export function TabBarIcon({color, Icon}) {
  return <Icon style={styles} color={color} />;
}

const styles = StyleSheet.create({
  icon: {
    width: getSize(24),
    height: getSize(24),
  },
});
