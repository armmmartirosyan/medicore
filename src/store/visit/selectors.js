import {createSelector} from '@reduxjs/toolkit';

const visitBaseSelector = store => store.visit;

const visitId = createSelector(visitBaseSelector, state => state.visitId);
const doctorId = createSelector(visitBaseSelector, state => state.doctorId);
const pacientId = createSelector(visitBaseSelector, state => state.pacientId);
const startTime = createSelector(visitBaseSelector, state => state.startTime);
const endTime = createSelector(visitBaseSelector, state => state.endTime);
const notes = createSelector(visitBaseSelector, state => state.notes);
const date = createSelector(visitBaseSelector, state => state.date);

export const visitSelectors = {
  visitId,
  doctorId,
  pacientId,
  startTime,
  endTime,
  notes,
  date,
};
