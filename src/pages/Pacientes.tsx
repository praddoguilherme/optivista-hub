import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useClinic } from "@/hooks/use-clinic";

interface Patient {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  created_at: string;
}

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const clinicId = useClinic();

  // Fetch patients
  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching patients:", error);
        toast({
          title: "Erro ao carregar pacientes",
          description: "Ocorreu um erro ao carregar a lista de pacientes.",
          variant: "destructive",
        });
        throw error;
      }

      return data as Patient[];
    },
  });

  // Filter patients based on search term
  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new patient
  const handleAddPatient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if (!clinicId) {
      toast({
        title: "Erro",
        description: "Não foi possível identificar a clínica",
        variant: "destructive",
      });
      return;
    }

    const newPatient = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      birth_date: formData.get("birth_date") as string,
      clinic_id: clinicId
    };

    const { error } = await supabase.from("patients").insert([newPatient]);

    if (error) {
      console.error("Error adding patient:", error);
      toast({
        title: "Erro ao adicionar paciente",
        description: "Ocorreu um erro ao tentar adicionar o paciente.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Paciente adicionado",
      description: "O paciente foi adicionado com sucesso.",
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <p className="text-gray-600 mt-2">Gerencie seus pacientes</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Paciente</DialogTitle>
              <DialogDescription>
                Preencha os dados do paciente abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" />
              </div>
              <div>
                <Label htmlFor="birth_date">Data de Nascimento</Label>
                <Input id="birth_date" name="birth_date" type="date" />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Adicionar Paciente</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data de Nascimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Carregando pacientes...
              </TableCell>
            </TableRow>
          ) : filteredPatients?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum paciente encontrado
              </TableCell>
            </TableRow>
          ) : (
            filteredPatients?.map((patient) => (
              <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>
                  {patient.birth_date
                    ? new Date(patient.birth_date).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Pacientes;
