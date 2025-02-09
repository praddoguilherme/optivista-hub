
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (user) {
      loadSelectedClinic();
    } else {
      setClinic(null);
      setLoading(false);
    }
  }, [user]);

  const loadSelectedClinic = async () => {
    try {
      const selectedClinicId = localStorage.getItem("selectedClinicId");
      
      if (!selectedClinicId) {
        // Check if user has any clinics
        const { data: clinicUsers, error: clinicsError } = await supabase
          .from("clinic_users")
          .select("clinic_id")
          .eq("user_id", user?.id);

        if (clinicsError) throw clinicsError;

        if (!clinicUsers || clinicUsers.length === 0) {
          // If no clinics found, redirect to clinic setup
          navigate("/clinic-setup");
          setLoading(false);
          return;
        }

        // Use the first clinic found
        localStorage.setItem("selectedClinicId", clinicUsers[0].clinic_id);

        // Load clinic details
        const { data: clinicDetails, error: clinicError } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", clinicUsers[0].clinic_id)
          .single();

        if (clinicError) throw clinicError;
        setClinic(clinicDetails);
      } else {
        // Load clinic details
        const { data: clinicDetails, error: clinicError } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", selectedClinicId)
          .single();

        if (clinicError) throw clinicError;
        setClinic(clinicDetails);
      }
    } catch (error) {
      console.error("Error loading clinic:", error);
      // Clear selected clinic ID if there was an error
      localStorage.removeItem("selectedClinicId");
      navigate("/clinic-setup");
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
