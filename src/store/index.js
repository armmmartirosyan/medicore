import {configureStore} from '@reduxjs/toolkit';
import registrationReducer from './registration';
import profileReducer from './profile';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
