import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: {
    default: "StudySpot | Cápsulas de Estudio Insonorizadas en Temuco",
    template: "%s | StudySpot Temuco",
  },
  description:
    "Tu santuario de concentración en Temuco. Cápsulas de estudio 100% insonorizadas con WiFi 5G dedicado, iluminación ajustable y reserva instantánea. A pasos de UFRO, UCT y U. Autónoma. Desde $2.500 CLP/hora. Abierto L-V 8:00-22:00.",

  keywords: [
    "cápsulas de estudio",
    "pods de estudio",
    "estudio insonorizado",
    "espacios de estudio silenciosos",
    "sala de estudio privada",
    "cabinas de estudio",
    "Temuco",
    "estudiar en Temuco",
    "coworking Temuco",
    "biblioteca Temuco",
    "espacios de estudio Temuco",
    "salas de estudio Temuco",
    "UFRO",
    "Universidad de La Frontera",
    "UCT",
    "Universidad Católica de Temuco",
    "Universidad Autónoma",
    "U Autónoma Temuco",
    "estudiar cerca UFRO",
    "biblioteca cerca UCT",
    "Araucanía",
    "Región de La Araucanía",
    "sur de Chile",
    "WiFi estudiantes",
    "WiFi 5G",
    "reserva estudio online",
    "estudio por horas",
    "concentración",
    "productividad académica",
    "tesis",
    "exámenes",
    "preparación pruebas",
    "donde estudiar en Temuco",
    "mejor lugar para estudiar Temuco",
    "espacio tranquilo estudiar",
    "coworking estudiantes",
    "lugar silencioso estudiar",
  ],

  authors: [
    { name: "StudySpot", url: "https://studyspot.cl" },
    { name: "StudySpot Temuco" },
  ],
  creator: "StudySpot Temuco",
  publisher: "StudySpot",
  generator: "Next.js",
  applicationName: "StudySpot",
  referrer: "origin-when-cross-origin",

  metadataBase: new URL("https://studyspot.cl"),
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": "/",
      "es": "/",
    },
  },

  openGraph: {
    title: "StudySpot | Tu Santuario de Estudio en Temuco",
    description:
      "Cápsulas de estudio 100% insonorizadas en Temuco. WiFi 5G dedicado, iluminación ajustable, reserva instantánea. A pasos de UFRO, UCT y U. Autónoma. Desde $2.500 CLP/hora.",
    type: "website",
    locale: "es_CL",
    url: "https://studyspot.cl",
    siteName: "StudySpot Temuco",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StudySpot - Cápsulas de Estudio Insonorizadas en Temuco, Chile",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "StudySpot Temuco - Logo",
        type: "image/png",
      },
    ],
    countryName: "Chile",
  },

  twitter: {
    card: "summary_large_image",
    title: "StudySpot | Cápsulas de Estudio en Temuco",
    description:
      "Tu santuario de concentración en Temuco. Cápsulas 100% insonorizadas con WiFi 5G. Reserva desde $2.500 CLP/hora. A pasos de UFRO y UCT.",
    images: ["/og-image.png"],
    creator: "@studyspottemuco",
    site: "@studyspottemuco",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StudySpot",
  },

  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },

  category: "education",
  classification: "Espacios de Estudio",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  other: {
    "geo.region": "CL-AR",
    "geo.placename": "Temuco, Araucanía, Chile",
    "geo.position": "-38.7396;-72.5971",
    "ICBM": "-38.7396, -72.5971",
    "business:contact_data:locality": "Temuco",
    "business:contact_data:region": "Araucanía",
    "business:contact_data:country_name": "Chile",
    "business:contact_data:postal_code": "4780000",
    "business:contact_data:street_address": "Av. Alemania 0123",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
    "language": "Spanish",
    "coverage": "Chile",
    "target": "all",
    "HandheldFriendly": "true",
    "MobileOptimized": "320",
    "instagram:site": "@studyspot.temuco",
    "instagram:creator": "@studyspot.temuco",
    "product:price:amount": "2500",
    "product:price:currency": "CLP",
    "business:hours:day": "monday,tuesday,wednesday,thursday,friday",
    "business:hours:start": "08:00",
    "business:hours:end": "22:00",
  },
};

// Datos estructurados para Google
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://studyspot.cl/#organization",
      name: "StudySpot",
      alternateName: "StudySpot Temuco",
      url: "https://studyspot.cl",
      logo: {
        "@type": "ImageObject",
        url: "https://studyspot.cl/logo.png",
        width: 512,
        height: 512,
      },
      description: "Cápsulas de estudio insonorizadas en Temuco, Chile",
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        name: "Temuco, Chile",
      },
      sameAs: [
        "https://instagram.com/studyspot.temuco",
        "https://tiktok.com/@studyspot",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hola@studyspot.cl",
        availableLanguage: ["Spanish"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://studyspot.cl/#localbusiness",
      name: "StudySpot Temuco",
      alternateName: "StudySpot - Cápsulas de Estudio",
      description:
        "Cápsulas de estudio 100% insonorizadas con WiFi 5G dedicado. Tu santuario de concentración en Temuco, a pasos de UFRO, UCT y U. Autónoma.",
      url: "https://studyspot.cl",
      telephone: "+56912345678",
      email: "hola@studyspot.cl",
      image: "https://studyspot.cl/og-image.png",
      logo: "https://studyspot.cl/logo.png",
      priceRange: "$$",
      currenciesAccepted: "CLP",
      paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Alemania 0123",
        addressLocality: "Temuco",
        addressRegion: "Araucanía",
        postalCode: "4780000",
        addressCountry: "CL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -38.7396,
        longitude: -72.5971,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Temuco",
        },
        {
          "@type": "AdministrativeArea",
          name: "Región de La Araucanía",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "18:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios StudySpot",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pase Deep Focus - 1 Hora",
              description:
                "1 hora de estudio en cápsula insonorizada con WiFi 5G dedicado, iluminación ajustable y escritorio ergonómico",
            },
            price: "2500",
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Javiera M.",
          },
          reviewBody:
            "¡Salvé el semestre gracias a este lugar! El silencio es increíble.",
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Sebastián R.",
          },
          reviewBody:
            "Mi tesis avanzó más en una semana usando StudySpot que en un mes estudiando en mi casa.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://studyspot.cl/#website",
      url: "https://studyspot.cl",
      name: "StudySpot",
      description: "Cápsulas de estudio insonorizadas en Temuco",
      publisher: {
        "@id": "https://studyspot.cl/#organization",
      },
      inLanguage: "es-CL",
    },
    {
      "@type": "WebPage",
      "@id": "https://studyspot.cl/#webpage",
      url: "https://studyspot.cl",
      name: "StudySpot | Cápsulas de Estudio Insonorizadas en Temuco",
      isPartOf: {
        "@id": "https://studyspot.cl/#website",
      },
      about: {
        "@id": "https://studyspot.cl/#localbusiness",
      },
      description:
        "Tu santuario de concentración en Temuco. Cápsulas de estudio 100% insonorizadas con WiFi 5G dedicado.",
      inLanguage: "es-CL",
    },
    {
      "@type": "FAQPage",
      "@id": "https://studyspot.cl/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Puedo llevar mi propio café o snacks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Por supuesto! Fomentamos el ahorro estudiantil. Puedes traer tu café, snacks o lo que necesites. Solo te pedimos mantener limpio el espacio para el siguiente usuario.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo funciona el sistema de reservas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es simple: reservas online, recibes un código QR, lo escaneas al llegar y tu cápsula se desbloquea automáticamente. Sin filas, sin esperas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el precio por hora?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El Pase Deep Focus cuesta $2.500 CLP por 1 hora de concentración total. Incluye WiFi 5G dedicado, iluminación ajustable y escritorio ergonómico.",
          },
        },
        {
          "@type": "Question",
          name: "¿Hay descuentos para estudiantes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Nuestro precio ya está pensado para estudiantes! Además, ofrecemos paquetes de 5 y 10 horas con descuentos de hasta 20%.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el horario de atención?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lunes a Viernes de 8:00 a 22:00, Sábados de 9:00 a 20:00, y Domingos de 10:00 a 18:00.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://studyspot.cl/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://studyspot.cl",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
