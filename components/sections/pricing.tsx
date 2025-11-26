"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Clock, Usb, MonitorDot, Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";

const specs = [
  { icon: Usb, label: "Enchufe USB-C & USB-A" },
  { icon: MonitorDot, label: "Escritorio Ergonómico" },
  { icon: Wifi, label: "WiFi 5G Dedicado" },
  { icon: Clock, label: "Iluminación Ajustable" },
];

export function Pricing() {
  const [availablePods, setAvailablePods] = React.useState(7);
  const { mouseX, mouseY, handleMouseMove } = useMouseTracking();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAvailablePods((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(2, Math.min(12, newValue));
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="precios" 
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <FloatingParticles count={18} />

      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/30 to-muted/20" />
      
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-primary/10"
        size="w-[600px] h-[600px]"
        positionX="30%"
        positionY="20%"
        intensity={0.025}
        enablePulse={false}
      />
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-secondary/15"
        size="w-80 h-80"
        positionX="70%"
        positionY="60%"
        intensity={0.03}
        enablePulse={false}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Zap}
          badgeText="Precio Simple"
          titlePrefix="Un solo precio, "
          titleHighlight="cero complicaciones"
          description="Sin suscripciones, sin compromisos. Paga solo por lo que uses."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <Card className="group relative overflow-hidden border-primary/50 bg-card/80 backdrop-blur-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
            <div className="absolute top-0 right-0 z-10">
              <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-bl-lg">
                MÁS POPULAR
              </div>
            </div>

            <div className="absolute -inset-px bg-gradient-to-r from-primary/50 via-transparent to-primary/50 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <CardHeader className="relative text-center pt-8 pb-4">
              <div className="inline-flex items-center gap-2 text-primary font-medium mb-2">
                <Clock className="h-4 w-4" />
                <span>Pase Deep Focus</span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl sm:text-6xl font-bold">$2.500</span>
                <span className="text-muted-foreground text-lg">CLP</span>
              </div>
              <p className="text-muted-foreground mt-2">por 1 hora de concentración total</p>
            </CardHeader>

            <CardContent className="relative space-y-6">
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <spec.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{spec.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-destructive/10 border border-destructive/20"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                </span>
                <span className="text-sm font-medium text-destructive">
                  Solo quedan {availablePods} cápsulas disponibles ahora
                </span>
              </motion.div>
            </CardContent>

            <CardFooter className="relative pb-8">
              <Button
                size="lg"
                className="w-full text-lg py-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                Reservar Mi Cápsula
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          ¿Necesitas más tiempo? Combina múltiples horas con descuento.{" "}
          <a href="#" className="text-primary hover:underline">
            Contáctanos
          </a>
        </motion.p>
      </div>
    </section>
  );
}
