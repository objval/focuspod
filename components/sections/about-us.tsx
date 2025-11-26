"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Heart, Users } from "lucide-react";

import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { slideInLeft, slideInRight } from "@/lib/animation-variants";

export function AboutUs() {
  const { containerRef, smoothMouseX, smoothMouseY, handleMouseMove } = useMouseTracking({
    intensity: 0.03,
    enableSmoothing: true,
  });

  return (
    <section 
      ref={containerRef as React.RefObject<HTMLElement>}
      id="nosotros" 
      className="section-container-full"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 section-gradient-alt" />
      
      <FloatingParticles
        count={18}
        durationMin={10}
        durationRange={15}
        enableGlow
        glowProbability={0.25}
        opacityMax={0.6}
      />
      
      <ReactiveOrb 
        positionX="85%" 
        positionY="15%" 
        size="350px" 
        colorClass="bg-primary/8"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      <ReactiveOrb 
        positionX="5%" 
        positionY="70%" 
        size="280px" 
        colorClass="bg-secondary/12"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Users}
          badgeText="Quiénes Somos"
          titlePrefix="Conoce al equipo detrás de "
          titleHighlight="StudySpot"
          description="Estudiantes que entendieron el problema y crearon la solución."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Equipo StudySpot"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 sm:right-6 glass-card-intense border border-border rounded-xl p-4 shadow-lg max-w-[200px]"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <Heart className="h-5 w-5 fill-primary" />
                <span className="font-semibold">Hecho en Temuco</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Por estudiantes, para estudiantes.
              </p>
            </motion.div>

            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
              <span className="h-px w-8 bg-primary"></span>
              Nuestra Historia
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              No somos una inmobiliaria,{" "}
              <span className="text-primary">somos tu santuario</span>
            </h3>

            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Nacimos de una frustración compartida: la imposibilidad de encontrar
                un espacio verdaderamente silencioso para estudiar en Temuco.
              </p>
              <p>
                Como estudiantes universitarios, entendemos que cada hora cuenta.
                Que un examen puede cambiar tu semestre. Que necesitas más que una
                mesa y un enchufe: necesitas un <strong className="text-foreground">refugio de concentración</strong>.
              </p>
              <p>
                Por eso creamos StudySpot: cápsulas de estudio diseñadas por
                estudiantes que vivieron el problema, para estudiantes que buscan
                la solución.
              </p>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 relative pl-8"
            >
              <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/30" />
              <div className="pl-4 border-l-2 border-primary">
                <p className="text-xl font-medium italic text-foreground">
                  &quot;Cada estudiante merece un espacio donde su único límite sea su
                  propia capacidad.&quot;
                </p>
                <footer className="mt-2 text-sm text-muted-foreground">
                  — Nicolas Vergara, Nicolas Escobar, Francisca Fuentes, Nicolas Barros & Benjamin Sanchez
                </footer>
              </div>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Somos estudiantes de Temuco</span> que entendemos la frustración de no encontrar un lugar tranquilo para estudiar. No somos una inmobiliaria, somos tu santuario de concentración en medio del caos universitario.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
