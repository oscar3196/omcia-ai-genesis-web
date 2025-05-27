
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-ai-500 mr-2 animate-glow" size={24} />
            <span className="text-ai-500 font-semibold">Inteligencia Artificial Empresarial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            El futuro de tu empresa
            <br />
            <span className="text-ai-500 glow-text">es inteligente</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transformamos tu negocio con soluciones de IA personalizadas. 
            Automatización inteligente, análisis predictivo y decisiones basadas en datos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-ai-500 hover:bg-ai-600 text-white px-8 py-4 text-lg group animate-glow"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-ai-500 text-ai-500 hover:bg-ai-500 hover:text-white px-8 py-4 text-lg"
            >
              Ver casos de éxito
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
