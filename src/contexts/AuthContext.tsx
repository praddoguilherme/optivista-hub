
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const checkIfAdmin = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('email')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Erro ao verificar admin:', error);
        return false;
      }
      return !!data;
    } catch (error) {
      console.error('Erro ao verificar administrador:', error);
      return false;
    }
  };

  const updateUserState = async (currentUser: User | null) => {
    if (!currentUser) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const adminStatus = await checkIfAdmin(currentUser.email!);
      setUser(currentUser);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Erro ao atualizar estado do usuário:', error);
      setUser(currentUser);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await updateUserState(session?.user || null);
      } catch (error) {
        console.error('Erro ao inicializar auth:', error);
        await updateUserState(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await updateUserState(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema.",
      });
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setIsAdmin(false);
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
