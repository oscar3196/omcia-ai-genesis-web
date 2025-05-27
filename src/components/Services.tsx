
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, BarChart3, MessageSquare, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "Automatización",
    description: "Procesos automatizados inteligentes que reducen costos operativos y aumentan la eficiencia.",
  },
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description: "Asistentes virtuales con procesamiento de lenguaje natural para mejorar la atención al cliente 24/7.",
  },
  {
    icon: BarChart3,
    title: "Análisis Predictivo",
    description: "Insights avanzados y predicciones precisas para tomar decisiones estratégicas basadas en datos.",
  },
  {
    icon: Shield,
    title: "IA Segura",
    description: "Implementaciones robustas con los más altos estándares de seguridad y privacidad de datos.",
  },
  {
    icon: Zap,
    title: "Integración Rápida",
    description: "Soluciones plug-and-play que se integran seamlessly con tu infraestructura existente.",
  },
];

export const Services = () => {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Servicios de <span className="text-ai-500 glow-text">IA Avanzada</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones inteligentes diseñadas para impulsar tu negocio hacia el futuro digital
          </p>
        </div>
        
        {/* Primera fila con 3 servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {services.slice(0, 3).map((service, index) => (
            <Card 
              key={index} 
              className="service-card hover:scale-105 transition-all duration-300 group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-ai-500/10 rounded-full w-fit group-hover:bg-ai-500/20 transition-colors">
                  <service.icon className="text-ai-500 group-hover:scale-110 transition-transform" size={32} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Segunda fila centrada con los 2 servicios destacados */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {services.slice(3).map((service, index) => (
              <Card 
                key={index + 3} 
                className="service-card hover:scale-105 transition-all duration-300 group"
                style={{animationDelay: `${(index + 3) * 0.1}s`}}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-ai-500/10 rounded-full w-fit group-hover:bg-ai-500/20 transition-colors">
                    <service.icon className="text-ai-500 group-hover:scale-110 transition-transform" size={32} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
