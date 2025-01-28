import {createSelector} from '@reduxjs/toolkit';

const registerBaseSelector = store => store.register;

const emailSelector = createSelector(
  registerBaseSelector,
  state => state.email,
);

export const registerSelectors = {
  emailSelector,
};
