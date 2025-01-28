import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '@contexts';
import {Auth} from './auth';
import {App} from './app';

export function Navigation() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <App /> : <Auth />}
    </NavigationContainer>
  );
}
