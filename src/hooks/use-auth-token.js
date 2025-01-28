import {useEffect, useState} from 'react';
import {getAuthInfo} from '@utils';

export function useAuthToken() {
  const [info, setInfo] = useState('');

  useEffect(() => {
    (async () => {
      const authInfo = await getAuthInfo();

      setInfo(authInfo);
    })();
  }, []);

  return info;
}
