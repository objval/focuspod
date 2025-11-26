"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { ANIMATION_PRESETS } from "@/lib/animation-variants";

const articles = [
  {
    id: 1,
    title: "Las 5 cafeterías con mejor WiFi en Temuco (y por qué no bastan)",
    excerpt:
      "Analizamos los espacios de estudio más populares de la ciudad y descubrimos por qué los estudiantes siguen buscando alternativas.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop",
    category: "Productividad",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Cómo vencer la procrastinación antes de exámenes",
    excerpt:
      "Técnicas respaldadas por la ciencia para mantener el enfoque cuando más lo necesitas. Incluye el método Pomodoro adaptado.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    category: "Consejos",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "Guía completa: Crear tu rutina de estudio perfecta",
    excerpt:
      "Descubre cómo estructurar tus sesiones de estudio para maximizar la retención y minimizar el agotamiento mental.",
    image:
      "https://images.unsplash.com/photo-1513128034602-7814ccadence?q=80&w=2070&auto=format&fit=crop",
    category: "Guías",
    readTime: "8 min",
  },
];

const { container: containerVariants, item: itemVariants } = ANIMATION_PRESETS.blog;

export function BlogPreview() {
  const { mouseX, mouseY, handleMouseMove } = useMouseTracking();

  return (
    <section 
      id="blog" 
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <FloatingParticles count={15} />

      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-primary/10"
        size="w-72 h-72"
        positionX="85%"
        positionY="10%"
        intensity={0.025}
        enablePulse={false}
      />
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        colorClass="bg-secondary/15"
        size="w-64 h-64"
        positionX="-5%"
        positionY="70%"
        intensity={0.03}
        enablePulse={false}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titlePrefix="Blog "
          titleHighlight="FocusPod"
          description="Tips, guías y recursos para potenciar tu estudio."
          flexRow
          marginBottom="mb-12"
        >
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((article) => (
            <motion.article key={article.id} variants={itemVariants}>
              <Card className="group h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none z-10" />
                
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Badge
                    variant="secondary"
                    className="absolute bottom-4 left-4"
                  >
                    {article.category}
                  </Badge>
                </div>

                <CardContent className="relative p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} de lectura</span>
                  </div>

                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Leer más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Nuevos artículos cada semana
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
