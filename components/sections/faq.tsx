"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      <div className="absolute top-20 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

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
            <HelpCircle className="h-3 w-3 mr-1" />
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
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Contáctanos directamente
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
