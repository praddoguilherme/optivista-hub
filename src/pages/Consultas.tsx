import { Calendar, Plus, Check } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

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
  const [paciente, setPaciente] = useState("");
  const [horario, setHorario] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultas, setConsultas] = useState(mockConsultas);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paciente || !date || !horario || !tipo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pacienteSelecionado = mockPacientes.find(p => String(p.id) === paciente);

      toast({
        title: "Consulta agendada com sucesso!",
        description: `Agendamento confirmado para ${pacienteSelecionado?.nome} em ${date.toLocaleDateString()} às ${horario}`,
      });

      // Limpar formulário
      setPaciente("");
      setDate(undefined);
      setHorario("");
      setTipo("");
      setObservacoes("");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro ao tentar agendar a consulta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmarConsulta = async (consultaId: number) => {
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setConsultas(prevConsultas => 
        prevConsultas.map(consulta => 
          consulta.id === consultaId 
            ? { ...consulta, status: "Confirmada" }
            : consulta
        )
      );

      const consulta = consultas.find(c => c.id === consultaId);

      toast({
        title: "Consulta confirmada!",
        description: `A consulta de ${consulta?.paciente} foi confirmada com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao confirmar",
        description: "Ocorreu um erro ao tentar confirmar a consulta",
        variant: "destructive",
      });
    }
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
                  <Select 
                    required 
                    value={paciente} 
                    onValueChange={setPaciente}
                  >
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
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    required
                    className="col-span-3"
                  />
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo de Consulta</Label>
                  <Select 
                    required
                    value={tipo}
                    onValueChange={setTipo}
                  >
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
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
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
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Agendando..." : "Agendar Consulta"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Consultas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultas.map((consulta) => (
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
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        consulta.status === "Aguardando"
                          ? "bg-yellow-100 text-yellow-800"
                          : consulta.status === "Confirmada"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {consulta.status}
                    </span>
                    {consulta.status === "Aguardando" && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmarConsulta(consulta.id)}
                        className="gap-1"
                      >
                        <Check className="h-4 w-4" />
                        Confirmar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
