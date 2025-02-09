
import { FileText, FileCheck, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockExames = [
  {
    id: 1,
    paciente: "Maria Silva",
    tipo: "Hemograma",
    data: "2024-03-15",
    status: "Pendente",
  },
  {
    id: 2,
    paciente: "João Santos",
    tipo: "Raio-X",
    data: "2024-03-14",
    status: "Realizado",
  },
];

const Exames = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exames</h1>
        <p className="text-gray-600 mt-2">Gerencie os exames</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Realizados</CardTitle>
            <FileCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total no Mês</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimos Exames</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockExames.map((exame) => (
              <div
                key={exame.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{exame.paciente}</h3>
                  <p className="text-sm text-gray-600">
                    {exame.tipo} - {new Date(exame.data).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    exame.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {exame.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exames;
