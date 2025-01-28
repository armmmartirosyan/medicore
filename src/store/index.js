import {configureStore} from '@reduxjs/toolkit';
import registerReducer from './register';

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});
