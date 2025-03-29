import {configureStore} from '@reduxjs/toolkit';
import registrationReducer from './registration';
import medicinesReducer from './medicines';
import profileReducer from './profile';
import visitReducer from './visit';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    medicines: medicinesReducer,
    profile: profileReducer,
    visit: visitReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
