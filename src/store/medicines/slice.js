import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notes: '',
  name: '',
  dose: '',
  startDate: null,
  quantity: 0,
  dayCount: 0,
};

export const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    changeMedicinesState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetMedicinesState: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {changeMedicinesState, resetMedicinesState} =
  medicinesSlice.actions;

export default medicinesSlice.reducer;
