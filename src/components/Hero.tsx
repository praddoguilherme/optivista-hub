
import { Monitor, Glasses, UserRound } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Sistema Inteligente para
            <span className="text-primary block mt-2">Gestão de Optometria</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simplifique sua prática com nossa solução completa para profissionais de optometria.
            Gerencie pacientes, exames e prescrições em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
              Agendar Demonstração
            </button>
            <button className="w-full sm:w-auto px-8 py-3 text-primary bg-primary-light rounded-lg hover:bg-primary-hover hover:text-white transition-colors">
              Saber Mais
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: Monitor,
              title: "Interface Intuitiva",
              description: "Design moderno e fácil de usar para maior produtividade",
            },
            {
              icon: Glasses,
              title: "Gestão Completa",
              description: "Controle total de pacientes, exames e prescrições",
            },
            {
              icon: UserRound,
              title: "Foco no Paciente",
              description: "Melhore a experiência e o atendimento ao paciente",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
