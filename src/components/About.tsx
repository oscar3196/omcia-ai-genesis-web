
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Lightbulb, Target } from "lucide-react";

const stats = [
  { icon: Users, number: "15+", label: "Proyectos Entregados" },
  { icon: Award, number: "100%", label: "Satisfacción del Cliente" },
  { icon: Lightbulb, number: "2+", label: "Años de Experiencia" },
  { icon: Target, number: "15+", label: "Empresas Atendidas" },
];

export const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escalando empresas con <span className="text-ai-500 glow-text">Inteligencia Artificial</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              En SOLPORIA somos una empresa joven con una pasión desbordante por la inteligencia artificial 
              y su poder para escalar negocios. Aunque estamos empezando nuestro camino, nuestro enfoque 
              especializado en IA empresarial nos ha permitido entregar resultados excepcionales desde 
              el primer día.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nuestras empresas clientes están encantadas con nuestro servicio y profesionalidad. 
              Nos dedicamos a resolver todo tipo de problemas empresariales y ayudar a mejorar procesos 
              existentes mediante soluciones de IA innovadoras y personalizadas. Cada proyecto es una 
              oportunidad para demostrar que la experiencia se construye con dedicación y resultados.
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
                    Creciendo juntos
                    <br />
                    hacia el éxito
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
