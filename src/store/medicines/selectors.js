import {createSelector} from '@reduxjs/toolkit';

const medicinesBaseSelector = store => store.medicines;

const notes = createSelector(medicinesBaseSelector, state => state.notes);
const name = createSelector(medicinesBaseSelector, state => state.name);
const dose = createSelector(medicinesBaseSelector, state => state.dose);
const quantity = createSelector(medicinesBaseSelector, state => state.quantity);
const dayCount = createSelector(medicinesBaseSelector, state => state.dayCount);
const startDate = createSelector(
  medicinesBaseSelector,
  state => state.startDate,
);

export const medicinesSelectors = {
  notes,
  name,
  dose,
  startDate,
  quantity,
  dayCount,
};
