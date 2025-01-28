import {useSelector} from 'react-redux';
import {registrationSelectors} from '@store/registration';
import {useMemo} from 'react';

export function useFinishDisabled() {
  const firstName = useSelector(registrationSelectors.fNameSelector);
  const lastName = useSelector(registrationSelectors.lNameSelector);
  const phoneNumber = useSelector(registrationSelectors.phoneNumberSelector);

  return useMemo(() => {
    return !firstName || !lastName || !phoneNumber;
  }, [firstName, lastName, phoneNumber]);
}
