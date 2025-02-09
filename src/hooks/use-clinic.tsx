
import { useClinic as useClinicContext } from "@/contexts/ClinicContext";

export function useClinic() {
  const { clinic } = useClinicContext();
  return clinic?.id;
}
