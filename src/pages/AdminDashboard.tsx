
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Clinic {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export default function AdminDashboard() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .order("name");

      if (error) throw error;
      setClinics(data || []);
    } catch (error) {
      console.error("Error loading clinics:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar clínicas",
        description: "Não foi possível carregar a lista de clínicas.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-gray-600 mt-2">
            Gerencie todas as clínicas do sistema
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Clínica
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Carregando clínicas...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-semibold">
                  {clinic.name}
                </CardTitle>
                <Building2 className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                {clinic.email && (
                  <p className="text-sm text-gray-600">{clinic.email}</p>
                )}
                {clinic.phone && (
                  <p className="text-sm text-gray-600">{clinic.phone}</p>
                )}
                {clinic.address && (
                  <p className="text-sm text-gray-600">{clinic.address}</p>
                )}
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Gerenciar Clínica
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
