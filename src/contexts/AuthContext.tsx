
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

  // Função para verificar se o usuário é admin
  const checkIsAdmin = async (email: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('admins')
        .select('email')
        .eq('email', email)
        .single();
      return !!data;
    } catch (error) {
      console.error('Erro ao verificar admin:', error);
      return false;
    }
  };

  // Função para atualizar o estado do usuário
  const updateUserState = async (currentUser: User | null) => {
    if (currentUser) {
      const isUserAdmin = await checkIsAdmin(currentUser.email!);
      setUser(currentUser);
      setIsAdmin(isUserAdmin);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Buscar sessão inicial
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await updateUserState(session?.user || null);
      } catch (error) {
        console.error('Erro ao inicializar sessão:', error);
      } finally {
        setLoading(false);
      }
    };

    // Monitorar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      await updateUserState(session?.user || null);
    });

    initSession();

    return () => {
      subscription.unsubscribe();
    };
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
      console.error('Erro no login:', error);
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
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
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
