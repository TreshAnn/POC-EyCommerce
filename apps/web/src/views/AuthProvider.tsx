// AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { decodeJwt, JWTPayload } from 'jose';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  //   login: (user: User) => void;
  //   logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTokenChange = () => {
    const token = localStorage.getItem('ey_commerce_token');
    if (!token) {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('ey_commerce_token');
    if (token) {
      // Decode the token to get the user payload
      const userPayload = decodeJwt(token);
      setUser(userPayload);
    }
    setIsLoading(false);

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
