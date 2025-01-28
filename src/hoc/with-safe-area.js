import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {THEME_COLOR} from '@constants';

export function withSafeArea(Component) {
  return props => {
    return (
      <SafeAreaView style={styles.wrapper}>
        <Component {...props} />
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});
