import {useEffect, useState} from 'react';
import {getAuthInfo} from '@utils';
import {decode} from 'react-native-pure-jwt';
import {USER_TYPE_NAMES} from '@constants';

export function useAuthToken() {
  const [info, setInfo] = useState({
    isPatient: false,
    email: '',
    role: '',
  });

  useEffect(() => {
    (async () => {
      let authInfo = await getAuthInfo();

      decode(authInfo, 'ae313436-c8e8-473d-a587-82e59b725f8f', {
        skipValidation: false,
      })
        .then(decoded => {
          const role =
            decoded?.payload?.[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];

          setInfo({
            email: decoded?.payload?.email,
            isPatient: role === USER_TYPE_NAMES.PATIENT,
            role,
          });
        })
        .catch(err => console.error('Error decoding JWT:', err));
    })();
  }, []);

  return info;
}
