
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Lightbulb, Target } from "lucide-react";

const stats = [
  { icon: Users, number: "50+", label: "Proyectos Completados" },
  { icon: Award, number: "98%", label: "Satisfacción del Cliente" },
  { icon: Lightbulb, number: "15+", label: "Años de Experiencia" },
  { icon: Target, number: "100%", label: "Proyectos Exitosos" },
];

export const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Expertos en <span className="text-ai-500 glow-text">Inteligencia Artificial</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              En OmcIA, somos pioneros en la implementación de soluciones de inteligencia artificial 
              para empresas que buscan transformar su futuro digital. Nuestro equipo de expertos 
              combina años de experiencia con las tecnologías más avanzadas del mercado.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Desde startups hasta grandes corporaciones, ayudamos a nuestros clientes a automatizar 
              procesos, tomar decisiones más inteligentes y crear experiencias excepcionales para sus usuarios.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="service-card text-center">
                  <CardContent className="p-6">
                    <stat.icon className="text-ai-500 mx-auto mb-3" size={32} />
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-ai-500/20 to-purple-500/20 rounded-2xl p-8 service-card">
              <div className="h-full bg-gradient-to-br from-ai-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-ai-500 glow-text mb-4">IA</div>
                  <p className="text-lg text-muted-foreground">
                    Transformando el futuro
                    <br />
                    una empresa a la vez
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
