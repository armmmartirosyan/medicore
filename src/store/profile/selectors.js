import {createSelector} from '@reduxjs/toolkit';

const profileBaseSelector = store => store.profile;

const fNameSelector = createSelector(
  profileBaseSelector,
  state => state.firstName,
);

const lNameSelector = createSelector(
  profileBaseSelector,
  state => state.lastName,
);

const phoneNumberSelector = createSelector(
  profileBaseSelector,
  state => state.phoneNumber,
);

const phoneCodeSelector = createSelector(
  profileBaseSelector,
  state => state.phoneCode,
);

const birthDateSelector = createSelector(
  profileBaseSelector,
  state => state.birthDate,
);

const imageSelector = createSelector(
  profileBaseSelector,
  state => state.imageUrl,
);

export const profileSelectors = {
  fNameSelector,
  lNameSelector,
  phoneNumberSelector,
  phoneCodeSelector,
  birthDateSelector,
  imageSelector,
};
