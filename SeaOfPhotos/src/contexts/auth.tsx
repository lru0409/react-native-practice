import { useState, useEffect, createContext, useContext } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';

type AuthContextType = {
  isLoggedIn: boolean | null;
  checkLogin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const validateAccessToken = async (accessToken: string) => {
    const response = await fetch(`${UNSPLASH_BASE_URL}/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    return response.ok;
  }

  const checkLogin = async () => {
    const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
    if (!accessToken) {
      setIsLoggedIn(false);
      return;
    }
    const isValid = await validateAccessToken(accessToken);
    if (!isValid) {
      console.error('Invalid access token');
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
