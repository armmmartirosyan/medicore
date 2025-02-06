import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, DoctorInfo, ProcedureDetails} from '@screens';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
      <Stack.Screen name="ProcedureDetails" component={ProcedureDetails} />
    </Stack.Navigator>
  );
}
