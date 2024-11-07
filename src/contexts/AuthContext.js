import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, adminLogin, register, getProfile } from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then(userData => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email, password) => {
    const { token, user } = await login(email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const loginAdmin = async (email, password) => {
    const { token, admin } = await adminLogin(email, password);
    localStorage.setItem('token', token);
    setUser({ ...admin, isAdmin: true });
  };

  const registerUser = async (name, email, password) => {
    const { token, user } = await register(name, email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loginUser,
    loginAdmin,
    registerUser,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}