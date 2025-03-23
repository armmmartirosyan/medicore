import {configureStore} from '@reduxjs/toolkit';
import registrationReducer from './registration';
import profileReducer from './profile';
import visitReducer from './visit';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    profile: profileReducer,
    visit: visitReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
