
import { Eye } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-primary">OptiVista</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-600 hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-primary transition-colors">
              Benefícios
            </a>
            <a href="#contato" className="text-gray-600 hover:text-primary transition-colors">
              Contato
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex px-4 py-2 text-primary hover:bg-primary-light rounded-lg transition-colors">
              Entrar
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
