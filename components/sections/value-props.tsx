"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { VolumeX, Wifi, MapPin, Zap, Shield, Clock, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Floating particles component
function FloatingParticles() {
  const particles = React.useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? "glow" : "normal",
    })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full",
            particle.type === "glow" 
              ? "bg-primary/30 shadow-lg shadow-primary/20" 
              : "bg-primary/15"
          )}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Reactive orb component
function ReactiveOrb({ 
  baseX, 
  baseY, 
  size, 
  color, 
  mouseX, 
  mouseY,
}: { 
  baseX: string; 
  baseY: string; 
  size: string; 
  color: string;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl pointer-events-none", color)}
      style={{
        width: size,
        height: size,
        left: baseX,
        top: baseY,
        x: mouseX,
        y: mouseY,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function ValueProps() {
  const containerRef = React.useRef<HTMLElement>(null);
  
  // Mouse tracking for reactive orbs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.03);
    mouseY.set((e.clientY - centerY) * 0.03);
  };

  return (
    <section 
      ref={containerRef}
      id="beneficios" 
      className="relative min-h-screen py-24 sm:py-32 overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-muted/20" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Reactive Orbs */}
      <ReactiveOrb 
        baseX="10%" 
        baseY="20%" 
        size="350px" 
        color="bg-primary/10"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
      />
      <ReactiveOrb 
        baseX="80%" 
        baseY="60%" 
        size="300px" 
        color="bg-secondary/15"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
      />
      <ReactiveOrb 
        baseX="50%" 
        baseY="80%" 
        size="250px" 
        color="bg-primary/8"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles className="h-3 w-3" />
            Nuestros Beneficios
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            ¿Por qué elegir{" "}
            <span className="text-primary">StudySpot</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñamos cada detalle pensando en tu concentración y comodidad.
          </p>
        </motion.div>

        {/* Features Grid */}
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
                {/* Gradient Background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Subtle glow on hover */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <CardContent className="relative p-6 sm:p-8">
                  {/* Icon with enhanced styling */}
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

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom stats */}
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
