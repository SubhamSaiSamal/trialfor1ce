import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
  authType: 'braille_code' | 'email';
  printerModel?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<boolean>;
  loginWithBrailleCode: (code: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_BRAILLE_CODES = [
  'ABC123XY', 'DEF456UV', 'GHI789RS', 'JKL012PQ', 'MNO345LM'
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('braille_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('braille_user');
      }
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    // Mock login - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'demo@braille.com' && credentials.password === 'demo123') {
      const userData: User = {
        id: '1',
        username: 'Demo User',
        email: credentials.email,
        authType: 'email'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('braille_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const loginWithBrailleCode = async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_BRAILLE_CODES.includes(code.toUpperCase())) {
      const userData: User = {
        id: `braille_${code}`,
        username: `Braille User ${code}`,
        authType: 'braille_code',
        printerModel: 'BraillePro-3000'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('braille_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (userData: any) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('braille_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginWithBrailleCode,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}