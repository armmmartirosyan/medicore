import {useMemo, useState} from 'react';
import {isValidEmail, isSecurePassword} from '@utils';

export const useFieldValues = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disableSignIn = useMemo(() => {
    return !isValidEmail(email) || !isSecurePassword(password);
  }, [email, password]);

  return {
    email,
    password,
    disableSignIn,
    setEmail,
    setPassword,
  };
};
