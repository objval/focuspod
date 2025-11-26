"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = React.useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    type: string;
    xOffset: number;
  }>>([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        size: Math.random() * 5 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 5,
        type: Math.random() > 0.7 ? "glow" : "normal",
        xOffset: Math.random() * 15 - 7.5,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

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
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.8, 0.2],
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

// Reactive orb component that follows mouse
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

// Simple accordion item with glow on open
function FAQAccordionItem({ 
  faq, 
  index, 
  isOpen 
}: { 
  faq: { question: string; answer: string }; 
  index: number;
  isOpen: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative"
    >
      {/* Subtle glow effect when open */}
      <motion.div
        className="absolute -inset-2 rounded-xl blur-xl pointer-events-none"
        animate={{
          backgroundColor: isOpen ? "oklch(85% 0.15 85 / 0.08)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      
      <AccordionItem
        value={`item-${index}`}
        className={cn(
          "relative border border-border/50 rounded-xl px-6 bg-card/60 backdrop-blur-sm transition-all duration-300",
          isOpen && "border-primary/30 bg-card/80"
        )}
      >
        <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-5 group">
          <span className="flex items-center gap-3">
            <span
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg text-base font-bold transition-colors",
                isOpen ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
              )}
            >
              {index + 1}
            </span>
            {faq.question}
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground pb-5 pl-12">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

const faqs = [
  {
    question: "¿Puedo llevar mi propio café o snacks?",
    answer:
      "¡Por supuesto! Fomentamos el ahorro estudiantil. Puedes traer tu café, snacks o lo que necesites. Solo te pedimos mantener limpio el espacio para el siguiente usuario.",
  },
  {
    question: "¿Puedo entrar con un compañero de estudio?",
    answer:
      "Las cápsulas están diseñadas para uso individual, garantizando máxima concentración. Pronto lanzaremos cápsulas dobles para sesiones de estudio colaborativo.",
  },
  {
    question: "¿Cómo funciona el sistema de reservas?",
    answer:
      "Es simple: reservas online, recibes un código QR, lo escaneas al llegar y tu cápsula se desbloquea automáticamente. Sin filas, sin esperas.",
  },
  {
    question: "¿Qué pasa si llego tarde a mi reserva?",
    answer:
      "Tienes 10 minutos de gracia. Pasado ese tiempo, la cápsula queda disponible para otros usuarios. Puedes cancelar hasta 1 hora antes sin cargo.",
  },
  {
    question: "¿Hay descuentos para estudiantes?",
    answer:
      "¡Nuestro precio ya está pensado para estudiantes! Además, ofrecemos paquetes de 5 y 10 horas con descuentos de hasta 20%. Síguenos en redes para promociones especiales.",
  },
  {
    question: "¿Cuál es el horario de atención?",
    answer:
      "Estamos abiertos de Lunes a Viernes de 8:00 a 22:00, y Sábados de 9:00 a 20:00. Domingos de 10:00 a 18:00 (ideal para estudiar antes de la semana).",
  },
  {
    question: "¿No encuentras lo que buscas? ¡Contáctanos!",
    answer:
      "Estamos aquí para ayudarte. Escríbenos por Instagram @studyspot.temuco, envíanos un correo a hola@studyspot.cl, o visítanos directamente en nuestra ubicación. ¡Responderemos todas tus dudas!",
  },
];

export function FAQ() {
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);
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
    mouseX.set((e.clientX - centerX) * 0.05);
    mouseY.set((e.clientY - centerY) * 0.05);
  };

  return (
    <section 
      ref={containerRef}
      id="faq" 
      className="relative min-h-screen py-24 sm:py-32 overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Reactive Orbs */}
      <ReactiveOrb 
        baseX="20%" 
        baseY="20%" 
        size="300px" 
        color="bg-primary/10"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
      />
      <ReactiveOrb 
        baseX="70%" 
        baseY="60%" 
        size="250px" 
        color="bg-secondary/15"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
      />
      <ReactiveOrb 
        baseX="80%" 
        baseY="15%" 
        size="200px" 
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
            <HelpCircle className="h-3 w-3" />
            Preguntas Frecuentes
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            ¿Tienes <span className="text-primary">dudas</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Aquí respondemos las preguntas más comunes de nuestros usuarios.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqs.map((faq, index) => (
              <FAQAccordionItem 
                key={index}
                faq={faq}
                index={index}
                isOpen={openItem === `item-${index}`}
              />
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
