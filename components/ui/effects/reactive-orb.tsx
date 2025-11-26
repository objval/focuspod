"use client";

import * as React from "react";
import { motion, useSpring, useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReactiveOrbProps {
  /** Posición X como valor CSS. ej: "10%", "50px" */
  positionX: string;
  /** Posición Y como valor CSS */
  positionY: string;
  /** Tamaño - puede ser valor CSS "350px" o clases Tailwind "w-72 h-72" */
  size: string;
  /** Clases de color incluyendo opacidad. ej: "bg-primary/10" */
  colorClass?: string;
  /** Multiplicador de intensidad del movimiento. Default: 0.03 */
  intensity?: number;
  /** Configuración del spring */
  springConfig?: { damping: number; stiffness: number };
  /** Habilitar animación de pulso ambiental. Default: true */
  enablePulse?: boolean;
  /** Rango de escala del pulso. Default: [1, 1.1, 1] */
  pulseScale?: [number, number, number];
  /** Rango de opacidad del pulso. Default: [0.3, 0.5, 0.3] */
  pulseOpacity?: [number, number, number];
  /** Duración del pulso en segundos. Default: 8 */
  pulseDuration?: number;
  /** Valores de mouse del hook useMouseTracking */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** Si los valores de mouse ya están suavizados (Pattern A) */
  preSmoothed?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

// Presets de orbs comunes
export const ORB_PRESETS = {
  /** Orb primario grande */
  primaryLarge: {
    colorClass: "bg-primary/10",
    size: "w-[500px] h-[500px]",
    intensity: 0.025,
  },
  /** Orb secundario mediano */
  secondaryMedium: {
    colorClass: "bg-secondary/15",
    size: "w-80 h-80",
    intensity: 0.03,
  },
  /** Orb primario pequeño */
  primarySmall: {
    colorClass: "bg-primary/8",
    size: "w-64 h-64",
    intensity: 0.035,
  },
} as const;

export function ReactiveOrb({
  positionX,
  positionY,
  size,
  colorClass = "bg-primary/10",
  intensity = 0.03,
  springConfig = { damping: 30, stiffness: 100 },
  enablePulse = true,
  pulseScale = [1, 1.1, 1],
  pulseOpacity = [0.3, 0.5, 0.3],
  pulseDuration = 8,
  mouseX,
  mouseY,
  preSmoothed = false,
  className,
}: ReactiveOrbProps) {
  // Determinar si el size es valor CSS o clases Tailwind
  const isCSSSize = size.includes("px") || size.includes("rem") || size.includes("%");

  // Springs internos para cuando no viene pre-suavizado
  const internalX = useSpring(useMotionValue(0), springConfig);
  const internalY = useSpring(useMotionValue(0), springConfig);

  // Suscribirse a cambios de mouse si no está pre-suavizado
  React.useEffect(() => {
    if (preSmoothed) return;

    const unsubX = mouseX.on("change", (latest) => {
      internalX.set(latest * intensity);
    });
    const unsubY = mouseY.on("change", (latest) => {
      internalY.set(latest * intensity);
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, internalX, internalY, intensity, preSmoothed]);

  // Usar valores pre-suavizados o internos
  const x = preSmoothed ? mouseX : internalX;
  const y = preSmoothed ? mouseY : internalY;

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        colorClass,
        !isCSSSize && size,
        className
      )}
      style={{
        left: positionX,
        top: positionY,
        ...(isCSSSize && { width: size, height: size }),
        x,
        y,
      }}
      animate={
        enablePulse
          ? {
              scale: pulseScale,
              opacity: pulseOpacity,
            }
          : undefined
      }
      transition={
        enablePulse
          ? {
              duration: pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    />
  );
}
