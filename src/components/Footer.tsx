
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/10 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
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
            <p className="text-muted-foreground mb-6 max-w-md">
              Transformamos empresas con soluciones de inteligencia artificial innovadoras, 
              seguras y escalables para el futuro digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-ai-500/10 rounded-full hover:bg-ai-500/20 transition-colors">
                <Linkedin className="text-ai-500" size={20} />
              </a>
              <a href="#" className="p-2 bg-ai-500/10 rounded-full hover:bg-ai-500/20 transition-colors">
                <Twitter className="text-ai-500" size={20} />
              </a>
              <a href="#" className="p-2 bg-ai-500/10 rounded-full hover:bg-ai-500/20 transition-colors">
                <Github className="text-ai-500" size={20} />
              </a>
              <a href="#" className="p-2 bg-ai-500/10 rounded-full hover:bg-ai-500/20 transition-colors">
                <Mail className="text-ai-500" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-ai-500 transition-colors">Automatización</a></li>
              <li><a href="#" className="hover:text-ai-500 transition-colors">Chatbots</a></li>
              <li><a href="#" className="hover:text-ai-500 transition-colors">Análisis Predictivo</a></li>
              <li><a href="#" className="hover:text-ai-500 transition-colors">IA Segura</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#nosotros" className="hover:text-ai-500 transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-ai-500 transition-colors">Casos de éxito</a></li>
              <li><a href="#contacto" className="hover:text-ai-500 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-ai-500 transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 SOLPORIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
