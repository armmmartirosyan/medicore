import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeRegisterState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetRegisterState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {changeRegisterState, resetRegisterState} = registerSlice.actions;

export default registerSlice.reducer;
