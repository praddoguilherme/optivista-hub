
import { createContext, useContext, useState, useEffect } from "react";
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

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

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
        const { data: userClinics, error: clinicsError } = await supabase
          .from("clinic_users")
          .select("clinic_id")
          .eq("user_id", user?.id)
          .single();

        if (clinicsError) {
          // If no clinics found, redirect to clinic setup
          navigate("/clinic-setup");
          setLoading(false);
          return;
        }

        // Use the first clinic found
        localStorage.setItem("selectedClinicId", userClinics.clinic_id);
      }

      // Load clinic details
      const { data: clinicData, error: clinicError } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", selectedClinicId || userClinics.clinic_id)
        .single();

      if (clinicError) throw clinicError;

      setClinic(clinicData);
    } catch (error) {
      console.error("Error loading clinic:", error);
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

export function useClinic() {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
}
