
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  patient_id: string;
  appointment_date: string;
  type: string;
  status: string;
  notes: string | null;
  patients: {
    name: string;
  };
}

interface Patient {
  id: string;
  name: string;
}

const tiposConsulta = [
  "Primeira Consulta",
  "Retorno",
  "Rotina",
  "Emergência",
  "Avaliação",
];

// Dados mockados
const mockPatients: Patient[] = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
];

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patient_id: "1",
    appointment_date: "2024-03-15T10:00:00",
    type: "Primeira Consulta",
    status: "scheduled",
    notes: null,
    patients: { name: "João Silva" }
  },
  {
    id: "2",
    patient_id: "2",
    appointment_date: "2024-03-15T14:30:00",
    type: "Retorno",
    status: "confirmed",
    notes: "Paciente com melhora significativa",
    patients: { name: "Maria Santos" }
  },
  {
    id: "3",
    patient_id: "3",
    appointment_date: "2024-03-15T16:00:00",
    type: "Emergência",
    status: "scheduled",
    notes: null,
    patients: { name: "Pedro Oliveira" }
  },
];

const Consultas = () => {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [paciente, setPaciente] = useState("");
  const [horario, setHorario] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

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
      const [hours, minutes] = horario.split(":");
      const appointmentDate = new Date(date);
      appointmentDate.setHours(parseInt(hours), parseInt(minutes));

      const newAppointment: Appointment = {
        id: String(appointments.length + 1),
        patient_id: paciente,
        appointment_date: appointmentDate.toISOString(),
        type: tipo,
        status: "scheduled",
        notes: observacoes || null,
        patients: {
          name: mockPatients.find(p => p.id === paciente)?.name || ""
        }
      };

      setAppointments([...appointments, newAppointment]);

      toast({
        title: "Consulta agendada com sucesso!",
        description: `Agendamento confirmado para ${appointmentDate.toLocaleDateString()} às ${horario}`,
      });

      setPaciente("");
      setDate(undefined);
      setHorario("");
      setTipo("");
      setObservacoes("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro ao tentar agendar a consulta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmarConsulta = async (appointmentId: string) => {
    try {
      const updatedAppointments = appointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: "confirmed" }
          : appointment
      );
      
      setAppointments(updatedAppointments);

      toast({
        title: "Consulta confirmada!",
        description: "A consulta foi confirmada com sucesso.",
      });
    } catch (error) {
      console.error("Error confirming appointment:", error);
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
                      {mockPatients.map((patient) => (
                        <SelectItem 
                          key={patient.id} 
                          value={patient.id}
                          className="hover:bg-gray-100"
                        >
                          {patient.name}
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
              {appointments.map((consulta) => (
                <div
                  key={consulta.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{consulta.patients.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(consulta.appointment_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      - {consulta.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        consulta.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : consulta.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {consulta.status === "scheduled"
                        ? "Aguardando"
                        : consulta.status === "confirmed"
                        ? "Confirmada"
                        : "Em Andamento"}
                    </span>
                    {consulta.status === "scheduled" && (
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
      </div>
    </div>
  );
};

export default Consultas;
