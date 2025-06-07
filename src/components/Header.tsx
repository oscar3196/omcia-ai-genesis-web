
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/16a43edc-1f1f-453d-8b89-85ccae26155b.png" 
              alt="SOLPORIA Logo" 
              className="w-8 h-8 mr-2"
            />
            <div className="text-2xl font-bold">
              <span className="text-ai-500 glow-text">SOLPOR</span>
              <span className="text-white">IA</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-ai-500 transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="text-foreground hover:text-ai-500 transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="text-foreground hover:text-ai-500 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="text-foreground hover:text-ai-500 transition-colors">
              Contacto
            </a>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-ai-500 hover:bg-ai-600 text-white">
              Consulta Gratuita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#inicio" className="block text-foreground hover:text-ai-500 transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="block text-foreground hover:text-ai-500 transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="block text-foreground hover:text-ai-500 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="block text-foreground hover:text-ai-500 transition-colors">
              Contacto
            </a>
            <Button className="w-full bg-ai-500 hover:bg-ai-600 text-white">
              Consulta Gratuita
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
