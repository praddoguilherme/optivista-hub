
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/eye-favicon.png" 
              alt="Íris Logo" 
              className="w-6 h-6"
            />
            <span className="text-xl font-semibold text-primary">Íris</span>
          </div>
          
          {/* Desktop Navigation */}
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
          
          {/* Login/Start Buttons - Responsive */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              className="text-primary hover:bg-primary-light"
              onClick={() => navigate("/login")}
            >
              <span className="hidden md:inline">Entrar</span>
              <span className="md:hidden">Login</span>
            </Button>
            <Button 
              className="bg-primary text-white hover:bg-primary-hover"
              onClick={() => navigate("/login")}
            >
              <span className="hidden md:inline">Começar Agora</span>
              <span className="md:hidden">Registrar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
