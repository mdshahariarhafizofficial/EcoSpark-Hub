'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export type UserRole = 'MEMBER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User> | FormData) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateProfile: async () => {},
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
      api.defaults.headers.common['Authorization'] = `Bearer ${stored}`;
    }
    setIsChecking(false);
  }, []);

  const { data, isLoading } = useQuery<{ data: User }>({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me'),
    enabled: !!token, // Only fetch if we have a token
    retry: false,
  });

  const user = data?.data || null;

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    queryClient.setQueryData(['me'], { data: userData });
  };

  const updateProfile = async (userData: Partial<User> | FormData) => {
    if (!user) return;
    try {
      const isFormData = userData instanceof FormData;
      const res: any = await api.patch(`/users/${user.id}`, userData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
      });
      if (res.data) {
        queryClient.setQueryData(['me'], { data: { ...user, ...res.data } });
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setToken(null);
      queryClient.setQueryData(['me'], null);
      queryClient.clear();
      window.location.href = '/login';
    }
  };

  const contextLoading = isChecking || (!!token && isLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: contextLoading,
        login,
        logout,
        updateProfile,
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
