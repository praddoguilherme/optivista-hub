
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const Consultas = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Consultas</h1>
        <p className="text-gray-600 mt-2">Gerencie suas consultas</p>
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
                  className="flex items-center justify-between p-4 border rounded-lg"
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
