
import { useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
}

interface Exam {
  id: string;
  patient_id: string;
  type: string;
  status: string;
  exam_date: string;
  result_notes: string | null;
  patients: {
    name: string;
  };
}

const tiposExame = [
  "Hemograma",
  "Raio-X",
  "Ressonância Magnética",
  "Tomografia",
  "Ultrassom",
  "Eletrocardiograma",
];

// Dados mockados
const mockPatients: Patient[] = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
];

const mockExams: Exam[] = [
  {
    id: "1",
    patient_id: "1",
    type: "Hemograma",
    status: "pending",
    exam_date: "2024-03-15T10:00:00",
    result_notes: null,
    patients: { name: "João Silva" }
  },
  {
    id: "2",
    patient_id: "2",
    type: "Raio-X",
    status: "completed",
    exam_date: "2024-03-14T14:30:00",
    result_notes: "Resultado normal",
    patients: { name: "Maria Santos" }
  },
  {
    id: "3",
    patient_id: "3",
    type: "Ultrassom",
    status: "pending",
    exam_date: "2024-03-16T09:15:00",
    result_notes: null,
    patients: { name: "Pedro Oliveira" }
  },
];

const Exames = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [paciente, setPaciente] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [exams, setExams] = useState<Exam[]>(mockExams);

  const filteredExams = exams.filter((exam) =>
    exam.patients.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paciente || !tipo || !data) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newExam: Exam = {
        id: String(exams.length + 1),
        patient_id: paciente,
        type: tipo,
        status: "pending",
        exam_date: new Date(data).toISOString(),
        result_notes: observacoes || null,
        patients: {
          name: mockPatients.find(p => p.id === paciente)?.name || ""
        }
      };

      setExams([...exams, newExam]);

      toast({
        title: "Exame cadastrado com sucesso!",
        description: "O exame foi registrado no sistema.",
      });

      setPaciente("");
      setTipo("");
      setData("");
      setObservacoes("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error scheduling exam:", error);
      toast({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao tentar cadastrar o exame",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate statistics
  const pendingExams = exams.filter(exam => exam.status === "pending").length;
  const completedExams = exams.filter(exam => exam.status === "completed").length;
  const totalExams = exams.length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Exames</h1>
          <p className="text-gray-600 mt-2">Gerencie os exames</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Exame
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Exame</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um novo exame
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="paciente">Paciente</Label>
                <Select 
                  required 
                  value={paciente} 
                  onValueChange={setPaciente}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem 
                        key={patient.id} 
                        value={patient.id}
                      >
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de Exame</Label>
                <Select 
                  required
                  value={tipo}
                  onValueChange={setTipo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposExame.map((tipo) => (
                      <SelectItem 
                        key={tipo} 
                        value={tipo}
                      >
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="data">Data do Exame</Label>
                <Input
                  type="datetime-local"
                  id="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
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
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Exame"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingExams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Realizados</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedExams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total no Mês</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar exames..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Exames</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{exam.patients.name}</h3>
                  <p className="text-sm text-gray-600">
                    {exam.type} - {new Date(exam.exam_date).toLocaleDateString()} às{" "}
                    {new Date(exam.exam_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    exam.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {exam.status === "pending" ? "Pendente" : "Realizado"}
                </span>
              </div>
            ))}
            {(!filteredExams || filteredExams.length === 0) && (
              <p className="text-center text-gray-500 py-4">
                Nenhum exame encontrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exames;
