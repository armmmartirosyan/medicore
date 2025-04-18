import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Visits, VisitDetails} from '@screens';

const Stack = createNativeStackNavigator();

export function VisitsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Visits" component={Visits} />
      <Stack.Screen name="VisitDetails" component={VisitDetails} />
    </Stack.Navigator>
  );
}
