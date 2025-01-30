import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import {isValidName, isValidPhoneNumber} from '@utils';
import {registrationSelectors} from '@store/registration';

export function useFirstStepDisabled() {
  const firstName = useSelector(registrationSelectors.fNameSelector);
  const lastName = useSelector(registrationSelectors.lNameSelector);
  const phoneNumber = useSelector(registrationSelectors.phoneNumberSelector);

  return useMemo(() => {
    return (
      !isValidName(firstName) ||
      !isValidName(lastName) ||
      !isValidPhoneNumber(phoneNumber)
    );
  }, [firstName, lastName, phoneNumber]);
}
