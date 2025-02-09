
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

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Erro ao verificar administrador:', error);
      return false;
    }
  };

  const updateUserState = async (currentUser: User | null) => {
    try {
      if (currentUser) {
        const adminStatus = await checkIfAdmin(currentUser.email!);
        setUser(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar estado do usuário:', error);
      setUser(null);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Mudança no estado de autenticação:", event, session?.user?.email);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      await updateUserState(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
