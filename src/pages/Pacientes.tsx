
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

const mockPacientes = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria@email.com",
    telefone: "(11) 99999-9999",
    ultimaConsulta: "2024-03-15",
  },
  {
    id: 2,
    nome: "João Santos",
    email: "joao@email.com",
    telefone: "(11) 98888-8888",
    ultimaConsulta: "2024-03-10",
  },
];

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <p className="text-gray-600 mt-2">Gerencie seus pacientes</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Paciente
        </Button>
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
            <TableHead>Última Consulta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPacientes.map((paciente) => (
            <TableRow key={paciente.id} className="cursor-pointer hover:bg-gray-50">
              <TableCell className="font-medium">{paciente.nome}</TableCell>
              <TableCell>{paciente.email}</TableCell>
              <TableCell>{paciente.telefone}</TableCell>
              <TableCell>{new Date(paciente.ultimaConsulta).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Pacientes;
