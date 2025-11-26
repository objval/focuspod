import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudySpot | Cápsulas de Estudio Insonorizadas en Temuco",
  description:
    "Reserva tu cápsula de estudio insonorizada en Temuco. WiFi de alta velocidad, aislamiento acústico total y ubicación estratégica. Tu santuario de concentración.",
  keywords: [
    "cápsulas de estudio",
    "estudio insonorizado",
    "Temuco",
    "espacios de estudio",
    "coworking",
    "estudiantes",
  ],
  authors: [{ name: "StudySpot" }],
  openGraph: {
    title: "StudySpot | Tu Santuario de Estudio en Temuco",
    description:
      "Cápsulas de estudio insonorizadas con WiFi de alta velocidad. Reserva tu espacio de concentración.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
