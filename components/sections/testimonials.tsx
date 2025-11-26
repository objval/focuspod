"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { ANIMATION_PRESETS } from "@/lib/animation-variants";

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
    text: "Mi tesis avanzó más en una semana usando FocusPod que en un mes estudiando en mi casa. El WiFi nunca falla y la iluminación es perfecta.",
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

const { container: containerVariants, item: cardVariants } = ANIMATION_PRESETS.testimonials;

export function Testimonials() {
  const { mouseX, mouseY, handleMouseMove } = useMouseTracking();

  return (
    <section 
      id="testimonios" 
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <FloatingParticles count={20} />

      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-primary/10"
        size="w-[500px] h-[500px]"
        positionX="60%"
        positionY="15%"
        intensity={0.03}
        enablePulse={false}
      />
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-secondary/15"
        size="w-72 h-72"
        positionX="-5%"
        positionY="60%"
        intensity={0.025}
        enablePulse={false}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Star}
          badgeText="Testimonios Reales"
          titlePrefix="Lo que dicen nuestros "
          titleHighlight="estudiantes"
          description="+500 estudiantes ya descubrieron el poder de la concentración total."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={cardVariants}>
              <Card className="group h-full border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                
                <CardContent className="relative p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <p className="text-foreground mb-6 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>

                  <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                    {testimonial.highlight}
                  </Badge>

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
