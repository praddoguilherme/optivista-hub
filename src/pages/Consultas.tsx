
import { Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const mockConsultas = [
  {
    id: 1,
    paciente: "Maria Silva",
    horario: "09:00",
    tipo: "Rotina",
    status: "Aguardando",
  },
  {
    id: 2,
    paciente: "João Santos",
    horario: "10:30",
    tipo: "Retorno",
    status: "Em Andamento",
  },
];

const mockPacientes = [
  { id: 1, nome: "Maria Silva" },
  { id: 2, nome: "João Santos" },
  { id: 3, nome: "Ana Oliveira" },
  { id: 4, nome: "Pedro Costa" },
];

const tiposConsulta = [
  "Primeira Consulta",
  "Retorno",
  "Rotina",
  "Emergência",
  "Avaliação",
];

const Consultas = () => {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Consulta agendada",
      description: "A consulta foi agendada com sucesso!",
      duration: 3000,
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Consultas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas consultas</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Consulta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agendar Nova Consulta</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar uma nova consulta
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paciente">Paciente</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {mockPacientes.map((paciente) => (
                        <SelectItem 
                          key={paciente.id} 
                          value={String(paciente.id)}
                          className="hover:bg-gray-100"
                        >
                          {paciente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Data da Consulta</Label>
                  <div className="border rounded-md p-4 mt-2">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="mx-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    type="time"
                    id="horario"
                    required
                    className="col-span-3"
                  />
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo de Consulta</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {tiposConsulta.map((tipo) => (
                        <SelectItem 
                          key={tipo} 
                          value={tipo}
                          className="hover:bg-gray-100"
                        >
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <textarea
                    id="observacoes"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Digite alguma observação importante..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Agendar Consulta</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Próximas Consultas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Consultas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConsultas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{consulta.paciente}</h3>
                    <p className="text-sm text-gray-600">
                      {consulta.horario} - {consulta.tipo}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      consulta.status === "Aguardando"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {consulta.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendário virá aqui em uma próxima atualização */}
        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Calendário de consultas será implementado em breve...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consultas;
