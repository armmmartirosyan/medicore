import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import {setAuthInfo, removeAuthInfo, getAuthInfo} from '@utils';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getAuthInfo();

      if (token) {
        setIsAuthenticated(true);
      }
    })();
  }, []);

  const signIn = useCallback(async token => {
    if (!token) {
      return;
    }

    await setAuthInfo(token);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(async () => {
    await removeAuthInfo();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
