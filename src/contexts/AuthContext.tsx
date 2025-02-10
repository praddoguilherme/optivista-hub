
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Comentando temporariamente a verificação de autenticação
  useEffect(() => {
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Desabilitando temporariamente o login
    toast({
      title: "Login desabilitado",
      description: "O login está temporariamente desabilitado.",
    });
    navigate('/dashboard');
  };

  const signUp = async (email: string, password: string) => {
    // Desabilitando temporariamente o registro
    toast({
      title: "Registro desabilitado",
      description: "O registro está temporariamente desabilitado.",
    });
  };

  const signOut = async () => {
    // Desabilitando temporariamente o logout
    toast({
      title: "Logout desabilitado",
      description: "O logout está temporariamente desabilitado.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
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
