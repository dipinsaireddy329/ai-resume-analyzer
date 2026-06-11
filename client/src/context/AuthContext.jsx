import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { http } from '../api/http.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get('/api/auth/me')
      .then(({ data }) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAdmin: user?.role === 'admin',
    async login(payload) {
      const { data } = await http.post('/api/auth/login', payload);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    },
    async register(payload) {
      const { data } = await http.post('/api/auth/register', payload);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    },
    async logout() {
      await http.post('/api/auth/logout').catch(() => null);
      localStorage.removeItem('token');
      setUser(null);
    }
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
