
import { Monitor, Glasses, UserRound } from "lucide-react";
import EyeAnimation from "./EyeAnimation";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white to-primary-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sistema Inteligente para
                <span className="text-primary block mt-2">Gestão de Optometria</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Simplifique sua prática com nossa solução completa para profissionais de optometria.
                Gerencie pacientes, exames e prescrições em um só lugar.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  Agendar Demonstração
                </button>
                <button className="w-full sm:w-auto px-8 py-4 text-primary bg-white rounded-lg hover:bg-primary-hover hover:text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  Saber Mais
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center animate-fade-up">
              <EyeAnimation />
            </div>
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
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-up backdrop-blur-lg bg-opacity-80"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
