
import { Eye } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold text-primary">Íris</span>
            </div>
            <p className="text-gray-600">
              Transformando a gestão de clínicas de optometria com tecnologia avançada.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Recursos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Preços</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Demonstração</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Sobre</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Contato</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Privacidade</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Termos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Íris. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
