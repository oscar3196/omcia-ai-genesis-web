
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-ai-500 glow-text">transformar</span> tu negocio?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contáctanos hoy y descubre cómo la inteligencia artificial puede revolucionar tu empresa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="service-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Tu nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                    <Input
                      placeholder="Tu email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background border-border"
                    />
                  </div>
                  <Input
                    placeholder="Tu empresa"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-background border-border"
                  />
                  <Textarea
                    placeholder="Cuéntanos sobre tu proyecto..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background border-border resize-none"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-ai-500 hover:bg-ai-600 text-white group"
                  >
                    Enviar mensaje
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-ai-500/10 rounded-full">
                    <Mail className="text-ai-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">contacto@solporia.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-ai-500/10 rounded-full">
                    <Phone className="text-ai-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Teléfono</p>
                    <p className="text-muted-foreground">+34 684 403 453</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-ai-500/10 rounded-full">
                    <MapPin className="text-ai-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ubicación</p>
                    <p className="text-muted-foreground">Sanxenxo</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="service-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-foreground">Consulta gratuita</h4>
                <p className="text-muted-foreground mb-4">
                  Agenda una consulta gratuita de 30 minutos para discutir cómo la IA puede 
                  transformar tu negocio.
                </p>
                <Button className="w-full bg-gradient-to-r from-ai-500 to-purple-500 hover:from-ai-600 hover:to-purple-600 text-white">
                  Agendar consulta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
