"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { VolumeX, Wifi, MapPin, Zap, Shield, Clock, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { ANIMATION_PRESETS } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: VolumeX,
    title: "Aislamiento Acústico Total",
    description:
      "Paredes insonorizadas con tecnología de última generación. Cero distracciones, máxima concentración.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: Wifi,
    title: "WiFi Fibra Dedicado",
    description:
      "Conexión de alta velocidad exclusiva para tu cápsula. Sin cortes, sin lag, sin límites.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
  {
    icon: MapPin,
    title: "Ubicación Estratégica",
    description:
      "A pasos de las principales universidades de Temuco. Llegas rápido, estudias más.",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Reserva Instantánea",
    description:
      "Reserva tu cápsula en segundos desde tu celular. Código QR y listo, sin esperas.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Ambiente Seguro",
    description:
      "Cámaras de seguridad 24/7, acceso controlado y personal siempre disponible para ayudarte.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: Clock,
    title: "Horario Extendido",
    description:
      "Abierto desde las 8am hasta las 10pm. Perfecto para madrugadores y nocturnos por igual.",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
  },
];

const { container: containerVariants, item: itemVariants } = ANIMATION_PRESETS.valueProps;

export function ValueProps() {
  const { containerRef, smoothMouseX, smoothMouseY, handleMouseMove } = useMouseTracking({
    intensity: 0.03,
    enableSmoothing: true,
  });

  return (
    <section 
      ref={containerRef as React.RefObject<HTMLElement>}
      id="beneficios" 
      className="relative min-h-screen py-24 sm:py-32 overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-muted/20" />
      
      <FloatingParticles
        count={20}
        durationMin={8}
        durationRange={12}
        enableGlow
        enableXOffset={false}
        enableScale
        yRange={25}
        opacityMax={0.7}
        baseColor="bg-primary/15"
        glowColor="bg-primary/30 shadow-lg shadow-primary/20"
      />
      
      <ReactiveOrb 
        positionX="10%" 
        positionY="20%" 
        size="350px" 
        colorClass="bg-primary/10"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      <ReactiveOrb 
        positionX="80%" 
        positionY="60%" 
        size="300px" 
        colorClass="bg-secondary/15"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      <ReactiveOrb 
        positionX="50%" 
        positionY="80%" 
        size="250px" 
        colorClass="bg-primary/8"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Sparkles}
          badgeText="Nuestros Beneficios"
          titlePrefix="¿Por qué elegir "
          titleHighlight="FocusPod"
          titleSuffix="?"
          description="Diseñamos cada detalle pensando en tu concentración y comodidad."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="relative group h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <CardContent className="relative p-6 sm:p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={cn(
                      "inline-flex p-4 rounded-2xl mb-6 transition-colors duration-300",
                      feature.iconBg,
                      feature.iconColor
                    )}
                  >
                    <feature.icon className="h-8 w-8" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "500+", label: "Estudiantes activos" },
            { value: "4.9★", label: "Calificación promedio" },
            { value: "0dB", label: "Ruido garantizado" },
            { value: "24/7", label: "Soporte disponible" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="p-4"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
