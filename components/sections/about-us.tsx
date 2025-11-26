"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";

export function AboutUs() {
  return (
    <section id="nosotros" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-muted/30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Equipo StudySpot"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 sm:right-6 bg-card border border-border rounded-xl p-4 shadow-lg max-w-[200px]"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <Heart className="h-5 w-5 fill-primary" />
                <span className="font-semibold">Hecho en Temuco</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Por estudiantes, para estudiantes.
              </p>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
              <span className="h-px w-8 bg-primary"></span>
              Nuestra Historia
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              No somos una inmobiliaria,{" "}
              <span className="text-primary">somos tu santuario</span>
            </h2>

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

            {/* Quote */}
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
                  — Equipo Fundador, StudySpot
                </footer>
              </div>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
