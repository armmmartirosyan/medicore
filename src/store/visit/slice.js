import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  visitId: 0,
  doctorId: 0,
  pacientId: 0,
  startTime: undefined,
  endTime: undefined,
  notes: '',
  date: '',
};

export const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    changeVisitState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetVisitState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {changeVisitState, resetVisitState} = visitSlice.actions;

export default visitSlice.reducer;
