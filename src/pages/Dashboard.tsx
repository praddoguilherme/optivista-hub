
import { BarChart, Users, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const mockData = [
  { mes: "Jan", consultas: 40 },
  { mes: "Fev", consultas: 35 },
  { mes: "Mar", consultas: 50 },
  { mes: "Abr", consultas: 45 },
  { mes: "Mai", consultas: 60 },
  { mes: "Jun", consultas: 55 },
];

const statsCards = [
  {
    title: "Total de Pacientes",
    value: "248",
    icon: Users,
    description: "+6 novos esta semana",
  },
  {
    title: "Consultas Hoje",
    value: "12",
    icon: Calendar,
    description: "4 consultas pendentes",
  },
  {
    title: "Exames Pendentes",
    value: "8",
    icon: FileText,
    description: "2 resultados para revisar",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao sistema administrativo da Íris.
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-600 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Consultas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Consultas por Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="consultas"
                  fill="#4A90A0"
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
