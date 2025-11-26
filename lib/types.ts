import type { LucideIcon } from "lucide-react";

// Tipos para features/beneficios
export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  iconColor?: string;
  iconBg?: string;
}

// Tipos para testimonios
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
  highlight: string;
}

// Tipos para artículos del blog
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

// Tipos para FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

// Tipos para navegación
export interface NavLink {
  href: string;
  label: string;
}

// Tipos para stats
export interface StatItem {
  value: string;
  label: string;
}
