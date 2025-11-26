"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    type: "problem",
    title: "¿Tu casa es un caos?",
    subtitle: "Encuentra tu silencio.",
    description:
      "Ruido de vecinos, familia, mascotas... Tu concentración merece algo mejor.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    type: "purpose",
    title: "Tu futuro título",
    subtitle: "merece un espacio digno.",
    description:
      "Invierte en tu educación con un ambiente diseñado para el éxito académico.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 3,
    type: "solution",
    title: "Reserva. Escanea. Estudia.",
    subtitle: "Así de simple.",
    description:
      "En menos de 2 minutos estarás en tu cápsula personal de concentración.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section id="inicio" className="relative min-h-screen w-full">
      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0 relative">
              <div className="relative min-h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                  <div className="max-w-2xl pt-20">
                    <AnimatePresence mode="wait">
                      {current === index && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Cápsulas disponibles en Temuco
                          </motion.div>

                          {/* Title */}
                          <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                          >
                            {slide.title}
                            <br />
                            <span className="text-primary">{slide.subtitle}</span>
                          </motion.h1>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg"
                          >
                            {slide.description}
                          </motion.p>

                          {/* CTA Buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4"
                          >
                            <Button
                              size="lg"
                              className="text-lg px-8 py-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-300"
                            >
                              Reservar Ahora
                            </Button>
                            <Button
                              size="lg"
                              variant="outline"
                              className="text-lg px-8 py-6"
                            >
                              Ver Precios
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            >
              <span className="sr-only">Ir al slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </Carousel>
    </section>
  );
}
