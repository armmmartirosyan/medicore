import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Navigation} from '@navigation';
import {store} from '@store/index';
import {AuthProvider} from '@contexts';
import {ReactQueryProvider} from '@api-hooks';
import {AlertNotificationRoot} from 'react-native-alert-notification';

export default function App() {
  return (
    <AlertNotificationRoot>
      <ReduxProvider store={store}>
        <AuthProvider>
          <ReactQueryProvider>
            <Navigation />
          </ReactQueryProvider>
        </AuthProvider>
      </ReduxProvider>
    </AlertNotificationRoot>
  );
}
//npx react-native run-ios --simulator="iPhone 14 (iOS 16.1)"
