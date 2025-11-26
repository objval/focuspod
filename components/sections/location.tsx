"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const nearbyPlaces = [
  { name: "UFRO", distance: "5 min caminando" },
  { name: "UCT", distance: "8 min caminando" },
  { name: "Mall Portal Temuco", distance: "3 min caminando" },
  { name: "U. Autónoma", distance: "10 min caminando" },
];

const schedule = [
  { days: "Lunes - Viernes", hours: "8:00 - 22:00" },
  { days: "Sábado", hours: "9:00 - 20:00" },
  { days: "Domingo", hours: "10:00 - 18:00" },
];

export function Location() {
  return (
    <section id="ubicacion" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/20" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

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
            <MapPin className="h-3 w-3 mr-1" />
            Ubicación Estratégica
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            En el corazón de{" "}
            <span className="text-primary">Temuco universitario</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Punto equidistante entre las principales universidades. A pasos de todo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              {/* Google Maps Embed - Av. Alemania, Temuco */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.407891772791!2d-72.59701672413445!3d-38.73977197175982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d3a93c0a4f7d%3A0x1234567890abcdef!2sAv.%20Alemania%2C%20Temuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación StudySpot Temuco"
                className="absolute inset-0"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Open in Google Maps Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              <Button
                asChild
                className="shadow-lg shadow-primary/20"
              >
                <a
                  href="https://maps.google.com/?q=Av.+Alemania+0123,+Temuco,+Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Abrir en Google Maps
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Av. Alemania 0123<br />
                      Temuco, Región de La Araucanía
                    </p>
                    <p className="text-sm text-primary mt-2">
                      Frente al Mall Portal Temuco
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-3">Horarios</h3>
                    <div className="space-y-2">
                      {schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">{item.days}</span>
                          <span className="font-medium">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Places Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Cerca de ti
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {nearbyPlaces.map((place, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium text-sm">{place.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {place.distance}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
