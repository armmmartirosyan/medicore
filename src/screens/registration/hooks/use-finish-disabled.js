import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {isValidEmail, isSecurePassword} from '@utils';
import {registrationSelectors} from '@store/registration';

export function useFinishDisabled() {
  const birthDate = useSelector(registrationSelectors.birthDateSelector);
  const email = useSelector(registrationSelectors.emailSelector);
  const password = useSelector(registrationSelectors.passwordSelector);

  return useMemo(() => {
    return !birthDate || !isValidEmail(email) || !isSecurePassword(password);
  }, [birthDate, email, password]);
}
