import { useState, useEffect, createContext, useContext } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type AuthContextType = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
        setIsLoggedIn(!!accessToken);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
