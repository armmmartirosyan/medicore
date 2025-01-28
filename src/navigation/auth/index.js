import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn} from '@screens';
import {withSafeArea} from '@hoc';

const Stack = createNativeStackNavigator();

function AuthComponent() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export const Auth = withSafeArea(AuthComponent);
