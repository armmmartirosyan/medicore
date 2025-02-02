import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Medicines} from '@screens';

const Stack = createNativeStackNavigator();

export function MedicinesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Medicines" component={Medicines} />
    </Stack.Navigator>
  );
}
