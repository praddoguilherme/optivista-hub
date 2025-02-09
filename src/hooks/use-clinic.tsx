
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useClinic() {
  const [clinicId, setClinicId] = useState<string | null>(null);

  useEffect(() => {
    // Por enquanto, vamos buscar a primeira clínica como exemplo
    // Em um cenário real, isso viria do contexto de autenticação
    const fetchClinicId = async () => {
      const { data } = await supabase
        .from("clinics")
        .select("id")
        .limit(1)
        .single();
      
      if (data) {
        setClinicId(data.id);
      }
    };

    fetchClinicId();
  }, []);

  return clinicId;
}
