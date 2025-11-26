"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  return (
    <section id="blog" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {articles.map((article) => (
            <motion.article key={article.id} variants={itemVariants}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
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

                <CardContent className="p-6">
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
      </div>
    </section>
  );
}
