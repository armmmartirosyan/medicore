import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {THEME_COLOR} from '@constants';

export function ColoredStatusBar({
  statusBgColor = THEME_COLOR,
  barStyle = 'light-content',
  bgColor = THEME_COLOR,
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
