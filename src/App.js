import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Navigation} from '@navigation';
import {store} from '@store/index';
import {AuthProvider} from '@contexts';
import {ReactQueryProvider} from '@api-hooks';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ReactQueryProvider>
          <Navigation />
        </ReactQueryProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
