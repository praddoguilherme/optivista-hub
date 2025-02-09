
import { Monitor, Glasses, UserRound, ChevronDown } from "lucide-react";
import EyeAnimation from "./EyeAnimation";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('recursos');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pb-20 relative bg-gradient-to-b from-white via-primary-light to-white">
      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
            Nova geração de software para optometria
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-8">
            Sistema para
            <span className="text-primary block mt-2">Gestão em Optometria</span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center animate-fade-up order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full filter blur-3xl"></div>
                <EyeAnimation />
              </div>
            </div>
            
            <div className="text-left space-y-6 animate-fade-up order-1 lg:order-2">
              <p className="text-xl text-gray-600 leading-relaxed">
                Simplifique sua prática com nossa solução completa para profissionais.
                Gerencie pacientes, exames e prescrições em um ambiente integrado.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium">
                  Agendar Demonstração
                </button>
                <button className="w-full sm:w-auto px-8 py-4 text-primary bg-white/90 backdrop-blur rounded-lg hover:bg-primary-hover hover:text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium">
                  Saber Mais
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              icon: Monitor,
              title: "Interface Intuitiva",
              description: "Design moderno e fácil de usar para maior produtividade no dia a dia",
            },
            {
              icon: Glasses,
              title: "Gestão Completa",
              description: "Controle total de pacientes, exames e prescrições em um só lugar",
            },
            {
              icon: UserRound,
              title: "Foco no Paciente",
              description: "Melhore a experiência e o atendimento com recursos personalizados",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 animate-fade-up backdrop-blur-lg group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <button 
            onClick={scrollToFeatures}
            className="p-2 rounded-full bg-white/80 backdrop-blur shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
