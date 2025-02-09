
import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface Clinic {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

interface ClinicContextType {
  clinic: Clinic | null;
  setClinic: (clinic: Clinic | null) => void;
  loading: boolean;
}

export const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: React.ReactNode }) {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname.startsWith('/dashboard')) {
      loadClinic();
    } else {
      setClinic(null);
      setLoading(false);
    }
  }, [user, location.pathname]);

  const loadClinic = async () => {
    try {
      // First, check if user is admin
      const { data: clinicUser, error: roleError } = await supabase
        .from("clinic_users")
        .select("role, clinic_id")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (roleError) throw roleError;

      if (!clinicUser) {
        // User has no clinic assignment
        navigate("/");
        return;
      }

      // Load clinic details
      const { data: clinicDetails, error: clinicError } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", clinicUser.clinic_id)
        .single();

      if (clinicError) throw clinicError;
      setClinic(clinicDetails);
    } catch (error) {
      console.error("Error loading clinic:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClinicContext.Provider value={{ clinic, setClinic, loading }}>
      {children}
    </ClinicContext.Provider>
  );
}
