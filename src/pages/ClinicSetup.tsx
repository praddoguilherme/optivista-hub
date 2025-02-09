
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Clinic {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

const ClinicSetup = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newClinic, setNewClinic] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserClinics();
  }, []);

  const fetchUserClinics = async () => {
    try {
      const { data: userClinics, error } = await supabase
        .from("clinic_users")
        .select(`
          clinic:clinics (
            id,
            name,
            email,
            phone,
            address
          )
        `)
        .eq("user_id", user?.id);

      if (error) throw error;

      // Transform the data structure
      const clinicsList = userClinics.map((uc: any) => uc.clinic);
      setClinics(clinicsList);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      toast({
        title: "Erro ao carregar clínicas",
        description: "Não foi possível carregar suas clínicas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      // First, insert the clinic
      const { data: clinicData, error: clinicError } = await supabase
        .from("clinics")
        .insert([newClinic])
        .select()
        .single();

      if (clinicError) throw clinicError;

      // Then, create the clinic_user relationship
      const { error: userError } = await supabase
        .from("clinic_users")
        .insert([
          {
            clinic_id: clinicData.id,
            user_id: user?.id,
            role: "admin", // First user is admin
          },
        ]);

      if (userError) throw userError;

      toast({
        title: "Clínica criada com sucesso!",
        description: "Você será redirecionado para o dashboard.",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating clinic:", error);
      toast({
        title: "Erro ao criar clínica",
        description: "Ocorreu um erro ao tentar criar a clínica.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleSelectClinic = async (clinicId: string) => {
    // Here you might want to store the selected clinic in your auth context
    // or local storage for future reference
    localStorage.setItem("selectedClinicId", clinicId);
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Configuração da Clínica</h1>

      {clinics.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Suas Clínicas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {clinics.map((clinic) => (
              <Card
                key={clinic.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSelectClinic(clinic.id)}
              >
                <CardHeader>
                  <CardTitle>{clinic.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {clinic.email && <p className="text-sm">{clinic.email}</p>}
                  {clinic.phone && <p className="text-sm">{clinic.phone}</p>}
                  {clinic.address && <p className="text-sm">{clinic.address}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Clínica</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateClinic} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Clínica</Label>
              <Input
                id="name"
                value={newClinic.name}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newClinic.email}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={newClinic.phone}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={newClinic.address}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, address: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={creating}>
              {creating ? "Criando..." : "Criar Clínica"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicSetup;
