import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  phoneCode: '+374',
  birthDate: null,
  email: '',
  password: '',
  signUpToken: '',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeRegistrationState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetRegistrationState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {changeRegistrationState, resetRegistrationState} =
  registrationSlice.actions;

export default registrationSlice.reducer;
