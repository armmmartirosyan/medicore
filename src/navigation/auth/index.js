import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, Registration, Welcome} from '@screens';
import {withSafeArea} from '@hoc';

const Stack = createNativeStackNavigator();

function AuthComponent() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
}

export const Auth = withSafeArea(AuthComponent);
