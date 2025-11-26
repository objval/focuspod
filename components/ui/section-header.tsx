"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  /** Icono de lucide-react para el badge */
  icon?: LucideIcon;
  /** Texto del badge */
  badgeText?: string;
  /** Variante del badge */
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  /** Texto antes del highlight */
  titlePrefix?: string;
  /** Texto resaltado (con text-primary) */
  titleHighlight: string;
  /** Texto después del highlight */
  titleSuffix?: string;
  /** Párrafo de descripción */
  description?: string;
  /** Centrar contenido. Default: true */
  centered?: boolean;
  /** Clase de ancho máximo. Default: "max-w-3xl" */
  maxWidth?: string;
  /** Clase de margen inferior. Default: "mb-16" */
  marginBottom?: string;
  /** Clases CSS adicionales */
  className?: string;
  /** Contenido adicional (ej: link "Ver todos") */
  children?: React.ReactNode;
  /** Layout flex row en lugar de stack. Default: false */
  flexRow?: boolean;
}

export function SectionHeader({
  icon: Icon,
  badgeText,
  badgeVariant = "secondary",
  titlePrefix = "",
  titleHighlight,
  titleSuffix = "",
  description,
  centered = true,
  maxWidth = "max-w-3xl",
  marginBottom = "mb-16",
  className,
  children,
  flexRow = false,
}: SectionHeaderProps) {
  if (flexRow) {
    // Layout alternativo: flex row con contenido a la derecha
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4",
          marginBottom,
          className
        )}
      >
        <div>
          {badgeText && (
            <Badge variant={badgeVariant} className="mb-4 gap-1">
              {Icon && <Icon className="h-3 w-3" />}
              {badgeText}
            </Badge>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {titlePrefix}
            <span className="text-primary">{titleHighlight}</span>
            {titleSuffix}
          </h2>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </motion.div>
    );
  }

  // Layout por defecto: centrado con stack vertical
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        centered && "text-center",
        maxWidth,
        centered && "mx-auto",
        marginBottom,
        className
      )}
    >
      {badgeText && (
        <Badge variant={badgeVariant} className="mb-4 gap-1">
          {Icon && <Icon className="h-3 w-3" />}
          {badgeText}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {titlePrefix}
        <span className="text-primary">{titleHighlight}</span>
        {titleSuffix}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
