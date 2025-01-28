import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from '@constants';

export function ColoredStatusBar({
  statusBgColor = COLORS.THEME_COLOR,
  bgColor = COLORS.THEME_COLOR,
  barStyle = 'light-content',
  children,
}) {
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <SafeAreaView style={{flex: 0, backgroundColor: statusBgColor}} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
