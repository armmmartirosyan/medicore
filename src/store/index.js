import {configureStore} from '@reduxjs/toolkit';
import registrationReducer from './registration';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});
