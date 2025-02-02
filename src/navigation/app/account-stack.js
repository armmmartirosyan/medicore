import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account, TermsAndPrivacy} from '@screens';

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="TermsAndPrivacy" component={TermsAndPrivacy} />
    </Stack.Navigator>
  );
}
