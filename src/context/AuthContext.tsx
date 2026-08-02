import { createContext, useEffect, useState, type ReactNode } from 'react';
import { AutoLogin } from '../apis/apis';

export interface User {
  id: number;
  email: string;
  userName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AutoLogin.get('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleAutoLogin = async () => {
      setIsLoading(true);
      try {
        const response = await AutoLogin.get('/auth/me');
        if (response.status === 200) {
          login(response.data);
        }
      } catch (error) {
        console.error('Auto login failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleAutoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
