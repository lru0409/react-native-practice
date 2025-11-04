import { useState, useEffect, createContext, useContext } from 'react';

import AuthService from '@src/services/auth';

type AuthContextType = {
  isLoggedIn: boolean | null;
  checkLogin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkLogin = async () => {
    const isValid = await AuthService.validateAccessToken();
    if (!isValid) {
      console.error('Invalid access token');
    }
    setIsLoggedIn(isValid);
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
