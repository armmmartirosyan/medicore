import {useEffect, useState} from 'react';
import {getAuthInfo} from '@utils';

export function useAuthToken() {
  const [info, setInfo] = useState('');

  useEffect(() => {
    (async () => {
      let authInfo = await getAuthInfo();

      setInfo(authInfo);
    })();
  }, []);

  return info;
}
