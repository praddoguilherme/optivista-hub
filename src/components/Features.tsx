
import { Eye, Search, ChartBar } from "lucide-react";

const Features = () => {
  return (
    <section id="recursos" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos Completos para sua Clínica
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece todas as ferramentas necessárias para
            gerenciar sua clínica de optometria com eficiência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Eye,
              title: "Prontuário Digital",
              description:
                "Mantenha todos os registros dos pacientes organizados e acessíveis",
            },
            {
              icon: Search,
              title: "Busca Avançada",
              description:
                "Encontre rapidamente informações de pacientes e histórico de atendimentos",
            },
            {
              icon: ChartBar,
              title: "Relatórios Detalhados",
              description:
                "Acompanhe o desempenho da sua clínica com análises completas",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
