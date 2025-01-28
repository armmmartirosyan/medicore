import React from 'react';
import {ScrollView} from 'react-native';

export function InputWrapperView({children, ...rest}) {
  return (
    <ScrollView bounces={false} {...rest}>
      {children}
    </ScrollView>
  );
}
