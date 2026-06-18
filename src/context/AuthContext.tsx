"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'customer' | 'vendor' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setRole: (role: Role) => void; // for demo switching
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'c1',
    name: 'Demo Customer',
    email: 'customer@demo.com',
    role: 'customer'
  });

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const setRole = (role: Role) => {
    if (role === 'customer') {
      setUser({ id: 'c1', name: 'Demo Customer', email: 'customer@demo.com', role });
    } else if (role === 'vendor') {
      setUser({ id: 'v1', name: 'TechStore NG', email: 'vendor@demo.com', role });
    } else if (role === 'admin') {
      setUser({ id: 'a1', name: 'Admin', email: 'admin@demo.com', role });
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, isAuthenticated: !!user, login, logout, setRole }}>
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
