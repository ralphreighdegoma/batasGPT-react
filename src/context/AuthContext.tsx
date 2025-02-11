'use client'
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any;
  authToken: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on initial mount
    const storedToken = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY!);
    const storedUser = localStorage.getItem(process.env.NEXT_PUBLIC_USER_KEY!);
    
    if (storedToken) setAuthToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (token: string, userData: any) => {
    localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY!, token);
    localStorage.setItem(process.env.NEXT_PUBLIC_USER_KEY!, JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  const updateUser = (userData: any) => {
    localStorage.setItem(process.env.NEXT_PUBLIC_USER_KEY!, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY!);
    localStorage.removeItem(process.env.NEXT_PUBLIC_USER_KEY!);
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
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