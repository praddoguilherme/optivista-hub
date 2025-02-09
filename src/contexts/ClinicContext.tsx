
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Clinic {
  id: string;
  name: string;
}

interface ClinicContextType {
  clinic: Clinic | null;
  loading: boolean;
  setClinic: (clinic: Clinic | null) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: React.ReactNode }) {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function loadClinic() {
      if (!user) {
        setClinic(null);
        setLoading(false);
        return;
      }

      try {
        const { data: clinics, error } = await supabase
          .from("clinic_users")
          .select(`
            clinics (
              id,
              name
            )
          `)
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (clinics?.clinics) {
          setClinic(clinics.clinics as Clinic);
        }
      } catch (error) {
        console.error("Error loading clinic:", error);
        toast({
          title: "Erro ao carregar clínica",
          description: "Não foi possível carregar os dados da clínica.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadClinic();
  }, [user]);

  return (
    <ClinicContext.Provider value={{ clinic, loading, setClinic }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
}
