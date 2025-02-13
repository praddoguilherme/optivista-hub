
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  CreditCard,
  Download,
  FileText,
  ChartPie,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const mockBarData = [
  { mes: "Jan", receitas: 15000, despesas: 10000 },
  { mes: "Fev", receitas: 18000, despesas: 12000 },
  { mes: "Mar", receitas: 16000, despesas: 9000 },
  { mes: "Abr", receitas: 20000, despesas: 11000 },
  { mes: "Mai", receitas: 17000, despesas: 10500 },
  { mes: "Jun", receitas: 19000, despesas: 11800 },
];

const mockPieData = [
  { name: "Consultas", value: 60 },
  { name: "Exames", value: 25 },
  { name: "Procedimentos", value: 15 },
];

const COLORS = ["#4A90A0", "#82ca9d", "#8884d8"];

const statsCards = [
  {
    title: "Receita Total",
    value: "R$ 105.000",
    icon: Wallet,
    description: "+12% em relação ao mês anterior",
    trend: "up",
  },
  {
    title: "Despesas",
    value: "R$ 64.300",
    icon: CreditCard,
    description: "-3% em relação ao mês anterior",
    trend: "down",
  },
  {
    title: "Lucro Líquido",
    value: "R$ 40.700",
    icon: PiggyBank,
    description: "+18% em relação ao mês anterior",
    trend: "up",
  },
];

const Financeiro = () => {
  return (
    <div className="space-y-8 max-w-[100vw] overflow-x-hidden px-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Financeiro</h1>
          <p className="text-gray-600 mt-2">
            Gestão financeira e relatórios
          </p>
        </div>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <Button variant="outline" className="gap-2 whitespace-nowrap">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2 whitespace-nowrap">
            <FileText className="h-4 w-4" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card) => (
          <Card key={card.title} className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 truncate">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-gray-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{card.value}</div>
              <p className="text-xs mt-1 flex items-center gap-1">
                {card.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 flex-shrink-0" />
                )}
                <span className={card.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {card.description}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Receitas x Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="receitas" fill="#4A90A0" name="Receitas" />
                  <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="h-5 w-5" />
              Distribuição de Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financeiro;
