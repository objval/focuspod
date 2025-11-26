import type { LucideIcon } from "lucide-react";
import { Instagram, Music } from "lucide-react";

// Configuración del sitio
export const SITE_CONFIG = {
  name: "FocusPod",
  tagline: "Tu santuario de concentración",
  location: "Temuco",
  region: "Región de La Araucanía",
  country: "Chile",
  address: "Av. Alemania 0123",
  price: "$2.500",
  currency: "CLP",
  email: "hola@focuspod.cl",
  phone: "+56 9 1234 5678",
  instagram: "@focuspod.temuco",
} as const;

// Links de navegación con iconos
export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", icon: "Home" },
  { href: "#beneficios", label: "Beneficios", icon: "Sparkles" },
  { href: "#precios", label: "Precios", icon: "CreditCard" },
  { href: "#testimonios", label: "Testimonios", icon: "MessageSquare" },
  { href: "#ubicacion", label: "Ubicación", icon: "MapPin" },
  { href: "#faq", label: "FAQ", icon: "HelpCircle" },
] as const;

// Links del footer
export const FOOTER_LINKS = {
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Precios", href: "#precios" },
    { label: "Blog", href: "#blog" },
    { label: "Nosotros", href: "#nosotros" },
  ],
  legal: [
    { label: "Términos de Servicio", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Política de Cancelación", href: "#" },
  ],
} as const;

// Redes sociales
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/focuspod.temuco",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@focuspod.temuco",
    icon: Music,
  },
];

// Horarios
export const SCHEDULE = [
  { days: "Lunes - Viernes", hours: "8:00 - 22:00" },
  { days: "Sábado", hours: "9:00 - 20:00" },
  { days: "Domingo", hours: "10:00 - 18:00" },
] as const;

// Lugares cercanos
export const NEARBY_PLACES = [
  { name: "UFRO", distance: "5 min caminando" },
  { name: "UCT", distance: "8 min caminando" },
  { name: "Mall Portal Temuco", distance: "3 min caminando" },
  { name: "U. Autónoma", distance: "10 min caminando" },
] as const;

// Stats compartidos
export const STATS = {
  students: "500+",
  rating: "4.9",
  recommendation: "98%",
  noise: "0dB",
} as const;
