import {createSelector} from '@reduxjs/toolkit';

const profileBaseSelector = store => store.profile;

const id = createSelector(profileBaseSelector, state => state.id);

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

const doctorSpecializations = createSelector(
  profileBaseSelector,
  state => state.doctorsSpecializations,
);

export const profileSelectors = {
  id,
  fNameSelector,
  lNameSelector,
  phoneNumberSelector,
  phoneCodeSelector,
  birthDateSelector,
  imageSelector,
  doctorSpecializations,
};
