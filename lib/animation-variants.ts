import type { Variants, Easing } from "framer-motion";

export interface AnimationVariantsConfig {
  /** Delay entre elementos hijos. Default: 0.1 */
  staggerChildren?: number;
  /** Delay inicial antes de animar. Default: 0 */
  delayChildren?: number;
  /** Desplazamiento Y inicial del item. Default: 30 */
  itemY?: number;
  /** Duración de la animación del item. Default: 0.5 */
  itemDuration?: number;
  /** Easing de la animación. Default: "easeOut" */
  itemEase?: Easing;
}

/**
 * Factory para crear variantes de animación container/item consistentes
 */
export function createAnimationVariants(config: AnimationVariantsConfig = {}) {
  const {
    staggerChildren = 0.1,
    delayChildren = 0,
    itemY = 30,
    itemDuration = 0.5,
    itemEase = "easeOut",
  } = config;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        ...(delayChildren > 0 && { delayChildren }),
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: itemY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: itemDuration,
        ease: itemEase,
      },
    },
  };

  return { container, item };
}

// Presets de variantes comunes
export const ANIMATION_PRESETS = {
  /** Default - stagger 0.1, delay 0 */
  default: createAnimationVariants(),
  /** Value Props - stagger 0.1, delay 0.2 */
  valueProps: createAnimationVariants({ staggerChildren: 0.1, delayChildren: 0.2 }),
  /** Testimonials - stagger 0.15 */
  testimonials: createAnimationVariants({ staggerChildren: 0.15 }),
  /** Blog - stagger 0.2 */
  blog: createAnimationVariants({ staggerChildren: 0.2 }),
  /** FAQ - stagger 0.1 */
  faq: createAnimationVariants({ staggerChildren: 0.1 }),
  /** Rápido - para elementos pequeños */
  fast: createAnimationVariants({ staggerChildren: 0.05, itemDuration: 0.3 }),
  /** Lento - para impacto dramático */
  slow: createAnimationVariants({ staggerChildren: 0.2, itemDuration: 0.7 }),
} as const;

// Variantes individuales para uso directo
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
