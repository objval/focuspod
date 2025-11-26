"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloatingParticles } from "@/components/ui/effects/floating-particles";
import { ReactiveOrb } from "@/components/ui/effects/reactive-orb";
import { SectionHeader } from "@/components/ui/section-header";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { cn } from "@/lib/utils";

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
  const { containerRef, smoothMouseX, smoothMouseY, handleMouseMove } = useMouseTracking({
    intensity: 0.05,
    enableSmoothing: true,
  });

  return (
    <section 
      ref={containerRef as React.RefObject<HTMLElement>}
      id="faq" 
      className="relative min-h-screen py-24 sm:py-32 overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      <FloatingParticles
        count={25}
        sizeRange={5}
        durationMin={8}
        durationRange={12}
        enableGlow
        enableScale
        xOffsetRange={15}
        opacityMax={0.8}
        baseColor="bg-primary/15"
        glowColor="bg-primary/30 shadow-lg shadow-primary/20"
      />
      
      <ReactiveOrb 
        positionX="20%" 
        positionY="20%" 
        size="300px" 
        colorClass="bg-primary/10"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      <ReactiveOrb 
        positionX="70%" 
        positionY="60%" 
        size="250px" 
        colorClass="bg-secondary/15"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />
      <ReactiveOrb 
        positionX="80%" 
        positionY="15%" 
        size="200px" 
        colorClass="bg-primary/8"
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        preSmoothed
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={HelpCircle}
          badgeText="Preguntas Frecuentes"
          titlePrefix="¿Tienes "
          titleHighlight="dudas"
          titleSuffix="?"
          description="Aquí respondemos las preguntas más comunes de nuestros usuarios."
        />

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
