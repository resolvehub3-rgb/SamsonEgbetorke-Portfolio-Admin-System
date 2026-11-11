/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase.ts';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  localAdminSignIn: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  signIn: async () => ({ success: false }),
  signOut: async () => {},
  localAdminSignIn: () => {},
});

const LOCAL_ADMIN_KEY = 'samteck_local_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    const client = getSupabaseClient();
    if (client) {
      // Check active Supabase session
      client.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'samtechdigital@gmail.com',
            role: 'admin',
          });
        } else {
          // Check local preview session
          checkLocalSession();
        }
        setLoading(false);
      });

      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'samtechdigital@gmail.com',
            role: 'admin',
          });
        } else {
          checkLocalSession();
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      checkLocalSession();
      setLoading(false);
    }
  }, []);

  const checkLocalSession = () => {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (active === 'true') {
        setUser({
          id: 'admin-local-1',
          email: 'samtechdigital@gmail.com',
          role: 'admin',
        });
      } else {
        setUser(null);
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const client = getSupabaseClient();

    if (client) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          });
          setLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setLoading(false);
        return { success: false, error: err.message || 'Authentication error' };
      }
    }

    // Direct preview verification login (e.g. before initial Supabase credentials are typed)
    if (email.trim().toLowerCase() === 'samtechdigital@gmail.com' || email.trim().toLowerCase() === 'admin@samteck.com') {
      localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
      setUser({
        id: 'admin-local-1',
        email: email.trim(),
        role: 'admin',
      });
      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return {
      success: false,
      error: 'Invalid email or credentials. Contact system administrator.',
    };
  };

  const localAdminSignIn = () => {
    localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
    setUser({
      id: 'admin-local-1',
      email: 'samtechdigital@gmail.com',
      role: 'admin',
    });
  };

  const signOut = async () => {
    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured, signIn, signOut, localAdminSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
