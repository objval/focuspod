"use client";

import * as React from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

export interface UseMouseTrackingOptions {
  /** Multiplicador de intensidad del movimiento. Default: 1 (sin modificar) */
  intensity?: number;
  /** Habilitar suavizado con spring. Default: false */
  enableSmoothing?: boolean;
  /** Configuración del spring para suavizado */
  springConfig?: { stiffness: number; damping: number };
}

export interface UseMouseTrackingReturn {
  /** Referencia al contenedor para calcular posición relativa */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Valor de movimiento X (raw o con intensidad aplicada) */
  mouseX: MotionValue<number>;
  /** Valor de movimiento Y (raw o con intensidad aplicada) */
  mouseY: MotionValue<number>;
  /** Valor suavizado X (solo si enableSmoothing=true) */
  smoothMouseX: MotionValue<number>;
  /** Valor suavizado Y (solo si enableSmoothing=true) */
  smoothMouseY: MotionValue<number>;
  /** Handler para onMouseMove del contenedor */
  handleMouseMove: (e: React.MouseEvent) => void;
}

/**
 * Hook para tracking de mouse con soporte para intensidad y suavizado.
 * Unifica los patrones containerRef y directo.
 */
export function useMouseTracking(
  options: UseMouseTrackingOptions = {}
): UseMouseTrackingReturn {
  const {
    intensity = 1,
    enableSmoothing = false,
    springConfig = { stiffness: 50, damping: 20 },
  } = options;

  const containerRef = React.useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs para suavizado (siempre creados pero solo usados si enableSmoothing)
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      // Usa containerRef si está disponible, sino currentTarget del evento
      const element = containerRef.current || e.currentTarget;
      if (!element) return;

      const rect = (element as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set((e.clientX - centerX) * intensity);
      mouseY.set((e.clientY - centerY) * intensity);
    },
    [mouseX, mouseY, intensity]
  );

  return {
    containerRef,
    mouseX,
    mouseY,
    smoothMouseX: enableSmoothing ? smoothMouseX : mouseX,
    smoothMouseY: enableSmoothing ? smoothMouseY : mouseY,
    handleMouseMove,
  };
}
