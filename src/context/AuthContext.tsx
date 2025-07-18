import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // En mode développement sans Supabase, simuler un utilisateur
  const isDevelopment = !import.meta.env.VITE_SUPABASE_URL;

  useEffect(() => {
    if (isDevelopment) {
      // Mode développement - pas de vraie authentification
      setLoading(false);
      return;
    }

    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Gérer l'expiration de session (6 heures)
      if (session) {
        const expiresAt = new Date(session.expires_at! * 1000);
        const now = new Date();
        const timeUntilExpiry = expiresAt.getTime() - now.getTime();
        
        // Si la session expire dans moins de 6 heures, programmer la déconnexion
        if (timeUntilExpiry > 0 && timeUntilExpiry <= 6 * 60 * 60 * 1000) {
          setTimeout(() => {
            signOut();
          }, timeUntilExpiry);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isDevelopment]);

  const signIn = async (email: string, password: string) => {
    if (isDevelopment) {
      // Mode développement
      if (email === 'admin@autorent.com' && password === 'admin123') {
        const mockUser = {
          id: 'dev-user',
          email: 'admin@autorent.com',
          user_metadata: { full_name: 'Admin Développement' }
        } as User;
        setUser(mockUser);
        return { error: null };
      } else {
        return { error: { message: 'Identifiants incorrects' } };
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    if (isDevelopment) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};