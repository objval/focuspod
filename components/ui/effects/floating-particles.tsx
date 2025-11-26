"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingParticlesProps {
  /** Número de partículas. Default: 20 */
  count?: number;
  /** Tamaño mínimo en px. Default: 2 */
  sizeMin?: number;
  /** Tamaño adicional máximo en px. Default: 4 */
  sizeRange?: number;
  /** Duración mínima de animación en segundos. Default: 15 */
  durationMin?: number;
  /** Duración adicional máxima en segundos. Default: 20 */
  durationRange?: number;
  /** Rango de movimiento vertical. Default: 30 */
  yRange?: number;
  /** Opacidad mínima. Default: 0.2 */
  opacityMin?: number;
  /** Opacidad máxima. Default: 0.5 */
  opacityMax?: number;
  /** Habilitar efecto glow en algunas partículas. Default: false */
  enableGlow?: boolean;
  /** Probabilidad de glow (0-1). Default: 0.3 */
  glowProbability?: number;
  /** Habilitar movimiento horizontal. Default: true */
  enableXOffset?: boolean;
  /** Rango de offset X. Default: 20 */
  xOffsetRange?: number;
  /** Habilitar animación de escala. Default: false */
  enableScale?: boolean;
  /** Rango de escala [min, max, min]. Default: [1, 1.2, 1] */
  scaleRange?: [number, number, number];
  /** Clase de color base. Default: "bg-primary/20" */
  baseColor?: string;
  /** Clase de color con glow. Default: "bg-primary/30 shadow-lg shadow-primary/20" */
  glowColor?: string;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  xOffset: number;
  hasGlow: boolean;
}

// Presets para uso rápido
export const PARTICLE_PRESETS = {
  /** Sutil - pocos partículas, sin glow */
  subtle: {
    count: 15,
    enableGlow: false,
    opacityMax: 0.4,
  },
  /** Normal - configuración balanceada */
  normal: {
    count: 20,
    enableGlow: false,
  },
  /** Intenso - más partículas con glow */
  intense: {
    count: 25,
    enableGlow: true,
    enableScale: true,
    opacityMax: 0.8,
  },
  /** CTA - máximo impacto */
  cta: {
    count: 30,
    sizeRange: 6,
    yRange: 40,
    enableGlow: true,
    enableScale: true,
    scaleRange: [1, 1.3, 1] as [number, number, number],
    opacityMax: 0.9,
    glowColor: "bg-primary/40 shadow-lg shadow-primary/30",
  },
} as const;

export function FloatingParticles({
  count = 20,
  sizeMin = 2,
  sizeRange = 4,
  durationMin = 15,
  durationRange = 20,
  yRange = 30,
  opacityMin = 0.2,
  opacityMax = 0.5,
  enableGlow = false,
  glowProbability = 0.3,
  enableXOffset = true,
  xOffsetRange = 20,
  enableScale = false,
  scaleRange = [1, 1.2, 1],
  baseColor = "bg-primary/20",
  glowColor = "bg-primary/30 shadow-lg shadow-primary/20",
  className,
}: FloatingParticlesProps) {
  const [particles, setParticles] = React.useState<Particle[]>([]);

  // Generar partículas solo en cliente para evitar hydration mismatch
  React.useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * sizeRange + sizeMin,
      duration: Math.random() * durationRange + durationMin,
      delay: Math.random() * 5,
      xOffset: enableXOffset ? Math.random() * xOffsetRange - xOffsetRange / 2 : 0,
      hasGlow: enableGlow && Math.random() > (1 - glowProbability),
    }));
    setParticles(generated);
  }, [count, sizeMin, sizeRange, durationMin, durationRange, enableXOffset, xOffsetRange, enableGlow, glowProbability]);

  // Memoizar el render de partículas
  const particleElements = React.useMemo(
    () =>
      particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full pointer-events-none",
            particle.hasGlow ? glowColor : baseColor
          )}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -yRange, 0],
            ...(enableXOffset && { x: [0, particle.xOffset, 0] }),
            opacity: [opacityMin, opacityMax, opacityMin],
            ...(enableScale && { scale: scaleRange }),
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      )),
    [particles, yRange, enableXOffset, opacityMin, opacityMax, enableScale, scaleRange, baseColor, glowColor]
  );

  if (particles.length === 0) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {particleElements}
    </div>
  );
}
