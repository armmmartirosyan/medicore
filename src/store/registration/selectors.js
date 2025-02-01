import {createSelector} from '@reduxjs/toolkit';

const registrationBaseSelector = store => store.registration;

const fNameSelector = createSelector(
  registrationBaseSelector,
  state => state.firstName,
);

const lNameSelector = createSelector(
  registrationBaseSelector,
  state => state.lastName,
);

const phoneNumberSelector = createSelector(
  registrationBaseSelector,
  state => state.phoneNumber,
);

const phoneCodeSelector = createSelector(
  registrationBaseSelector,
  state => state.phoneCode,
);

const birthDateSelector = createSelector(
  registrationBaseSelector,
  state => state.birthDate,
);

const emailSelector = createSelector(
  registrationBaseSelector,
  state => state.email,
);

const passwordSelector = createSelector(
  registrationBaseSelector,
  state => state.password,
);

const signUpTokenSelector = createSelector(
  registrationBaseSelector,
  state => state.signUpToken,
);

export const registrationSelectors = {
  emailSelector,
  fNameSelector,
  lNameSelector,
  phoneNumberSelector,
  phoneCodeSelector,
  birthDateSelector,
  passwordSelector,
  signUpTokenSelector,
};
