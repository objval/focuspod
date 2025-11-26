"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Floating Particles Component
const FloatingParticles = React.memo(function FloatingParticles() {
  const particles = React.useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

// Reactive Orb Component
function ReactiveOrb({ 
  mouseX, 
  mouseY, 
  className, 
  size, 
  offsetX, 
  offsetY,
  intensity = 0.02 
}: { 
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  className: string;
  size: string;
  offsetX: string;
  offsetY: string;
  intensity?: number;
}) {
  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  React.useEffect(() => {
    const unsubX = mouseX.on("change", (latest) => {
      x.set(latest * intensity);
    });
    const unsubY = mouseY.on("change", (latest) => {
      y.set(latest * intensity);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, x, y, intensity]);

  return (
    <motion.div
      className={`absolute ${size} ${className} rounded-full blur-3xl pointer-events-none`}
      style={{
        left: offsetX,
        top: offsetY,
        x,
        y,
      }}
    />
  );
}

const testimonials = [
  {
    id: 1,
    name: "Javiera Muñoz",
    role: "Estudiante UCT - Derecho",
    initials: "JM",
    rating: 5,
    text: "¡Salvé el semestre gracias a este lugar! Estaba a punto de reprobar Derecho Civil y acá pude estudiar 4 horas sin interrupciones. El silencio es increíble.",
    highlight: "Salvé el semestre",
  },
  {
    id: 2,
    name: "Sebastián Riquelme",
    role: "Tesista UFRO - Ingeniería",
    initials: "SR",
    rating: 5,
    text: "Mi tesis avanzó más en una semana usando StudySpot que en un mes estudiando en mi casa. El WiFi nunca falla y la iluminación es perfecta.",
    highlight: "Avancé más en una semana",
  },
  {
    id: 3,
    name: "Catalina Fernández",
    role: "Estudiante U. Autónoma - Psicología",
    initials: "CF",
    rating: 5,
    text: "Como alguien con TDAH, encontrar un espacio sin distracciones es oro. Las cápsulas me ayudan a mantener el foco. Vale cada peso.",
    highlight: "Espacio sin distracciones",
  },
  {
    id: 4,
    name: "Matías Contreras",
    role: "Freelancer - Diseño UX",
    initials: "MC",
    rating: 5,
    text: "No solo para estudiantes: vengo a trabajar en mis proyectos freelance cuando necesito concentración total. Es mi oficina secreta.",
    highlight: "Mi oficina secreta",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
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

export function Testimonials() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY]
  );

  return (
    <section 
      id="testimonios" 
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      {/* Reactive Orbs */}
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        className="bg-primary/10"
        size="w-[500px] h-[500px]"
        offsetX="60%"
        offsetY="15%"
        intensity={0.03}
      />
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        className="bg-secondary/15"
        size="w-72 h-72"
        offsetX="-5%"
        offsetY="60%"
        intensity={0.025}
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
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
            Testimonios Reales
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Lo que dicen nuestros{" "}
            <span className="text-primary">estudiantes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            +500 estudiantes ya descubrieron el poder de la concentración total.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <Card className="group h-full border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden">
                {/* Card glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                
                <CardContent className="relative p-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-foreground mb-6 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Highlight Badge */}
                  <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                    {testimonial.highlight}
                  </Badge>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground mt-1">Estudiantes activos</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground mt-1">Valoración promedio</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Recomendarían</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
