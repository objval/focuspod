"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Floating Particles Component
const FloatingParticles = React.memo(function FloatingParticles() {
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    duration: number;
    delay: number;
    xOffset: number;
  }>>([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        xOffset: Math.random() * 20 - 10,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

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
            x: [0, particle.xOffset, 0],
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function BlogPreview() {
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
      id="blog" 
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      
      {/* Reactive Orbs */}
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        className="bg-primary/10"
        size="w-72 h-72"
        offsetX="85%"
        offsetY="10%"
        intensity={0.025}
      />
      <ReactiveOrb
        mouseX={mouseX}
        mouseY={mouseY}
        className="bg-secondary/15"
        size="w-64 h-64"
        offsetX="-5%"
        offsetY="70%"
        intensity={0.03}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Blog <span className="text-primary">StudySpot</span>
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Tips, guías y recursos para potenciar tu estudio.
            </p>
          </div>
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Articles Grid */}
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
                {/* Card glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none z-10" />
                
                {/* Image */}
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
                  {/* Meta */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} de lectura</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Read More */}
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

        {/* Newsletter/Subscribe Section */}
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
