import React from 'react';
import {
  Account,
  TermsAndPrivacy,
  Profile,
  ChangePassword,
  NonWorkingDays,
  Specializations,
  WeekDaysSchedule,
} from '@screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Specializations" component={Specializations} />
      <Stack.Screen name="WeekDaysSchedule" component={WeekDaysSchedule} />
      <Stack.Screen name="NonWorkingDays" component={NonWorkingDays} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TermsAndPrivacy" component={TermsAndPrivacy} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
