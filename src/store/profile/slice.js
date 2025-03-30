import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  phoneCode: '+374',
  birthDate: null,
  imageUrl: '',
  doctorsSpecializations: [],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeProfileState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetProfileState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {changeProfileState, resetProfileState} = profileSlice.actions;

export default profileSlice.reducer;
