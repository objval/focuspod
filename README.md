# 🎧 StudySpot

> **Tu santuario de concentración en Temuco**

Landing page moderna para StudySpot, un servicio de cápsulas de estudio insonorizadas diseñadas para estudiantes universitarios en Temuco, Chile.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## 🎨 Paleta de Colores (Dark Mode)

El diseño utiliza un tema **"Soft Dark"** con tonos cálidos y acogedores:

| Variable | Color | Uso |
|----------|-------|-----|
| `--background` | `#1a1a1a` | Fondo principal |
| `--foreground` | `#F0F0F0` | Texto principal |
| `--primary` | `#E8C872` | CTAs, acentos, highlights (Ámbar dorado) |
| `--secondary` | `#3D3D3D` | Elementos secundarios |
| `--card` | `#2a2a2a` | Fondo de tarjetas |
| `--muted` | `#333333` | Fondos sutiles |
| `--muted-foreground` | `#A0A0A0` | Texto secundario |
| `--border` | `#2D2D2D` | Bordes |
| `--destructive` | `#E54D4D` | Alertas, escasez |

### Colores OKLCH (Sistema de diseño)

```css
--background: oklch(0.1776 0 0);
--foreground: oklch(0.9491 0 0);
--primary: oklch(0.9247 0.0524 66.1732);
--secondary: oklch(0.3163 0.0190 63.6992);
--muted: oklch(0.2520 0 0);
--card: oklch(0.2134 0 0);
```

---

## 🏗️ Estructura del Proyecto

```
studyspot/
├── app/
│   ├── globals.css      # Variables CSS y tema
│   ├── layout.tsx       # Layout principal con ThemeProvider
│   └── page.tsx         # Página principal (imports limpios)
├── components/
│   ├── sections/        # Secciones de la landing
│   │   ├── navbar.tsx
│   │   ├── hero-carousel.tsx
│   │   ├── value-props.tsx
│   │   ├── pricing.tsx
│   │   ├── testimonials.tsx   # ✨ NUEVO
│   │   ├── blog-preview.tsx
│   │   ├── about-us.tsx
│   │   ├── location.tsx       # ✨ NUEVO (Google Maps)
│   │   ├── faq.tsx            # ✨ NUEVO
│   │   ├── cta.tsx
│   │   ├── footer.tsx
│   │   └── index.ts     # Barrel exports
│   ├── ui/              # Componentes shadcn/ui
│   └── theme-provider.tsx
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
└── public/
```

---

## ✨ Características

### Secciones
- **Navbar Flotante** - Sticky con backdrop-blur, theme switcher, menú móvil
- **Hero Carousel** - 3 slides con autoplay, imágenes Unsplash, indicador de scroll
- **Value Props** - 3 tarjetas con iconos y efectos hover únicos
- **Pricing** - Tarjeta "Pase Deep Focus" con indicador de escasez animado
- **Blog Preview** - 2 artículos con imágenes y metadata
- **About Us** - Storytelling con quote y floating card
- **Testimonials** ✨ - 4 reseñas reales con rating y destacados
- **Location** ✨ - Google Maps embed, horarios, lugares cercanos
- **FAQ** ✨ - 6 preguntas frecuentes con acordeón animado
- **CTA Final** - Trust indicators y social proof
- **Footer** - Contacto, redes sociales, navegación

### Técnicas
- ✅ **Responsive** (Mobile First)
- ✅ **Animaciones** con Framer Motion
- ✅ **Dark Mode** por defecto con next-themes
- ✅ **Imágenes optimizadas** de Unsplash via next/image
- ✅ **Componentes modulares** con shadcn/ui
- ✅ **TypeScript** estricto

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.0.4 | Framework React |
| React | 19.2.0 | UI Library |
| Tailwind CSS | 4.x | Estilos (CSS-based config) |
| shadcn/ui | new-york | Componentes UI |
| Framer Motion | 12.x | Animaciones |
| Lucide React | 0.554 | Iconos |
| next-themes | 0.4.6 | Theme switching |
| Embla Carousel | 8.6.0 | Carrusel |

---

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/objval/studyspot.git
cd studyspot

# Instalar dependencias
npm install

# Instalar dependencias adicionales (si no están)
npm install framer-motion embla-carousel-autoplay

# Ejecutar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📁 Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

---

## 📄 Secciones de la Página (Detalle Completo)

### 1. 🧭 Navbar (`navbar.tsx`)
Barra de navegación flotante fija en la parte superior.

**Contenido:**
- **Logo:** Icono de audífonos (`Headphones`) + texto "StudySpot" (donde "Spot" está en color primario)
- **Links de navegación:** Inicio, Beneficios, Precios, Blog, Nosotros
- **Theme Switcher:** Botón para cambiar entre modo oscuro/claro (iconos `Sun`/`Moon`)
- **CTA:** Botón "Reservar Ahora"
- **Menú móvil:** Sheet lateral con navegación completa

**Comportamiento:** Sticky, backdrop-blur cuando hay scroll, animación de entrada desde arriba.

---

### 2. 🎠 Hero Carousel (`hero-carousel.tsx`)
Sección principal con carrusel de 3 slides a pantalla completa.

**Slides:**

| Slide | Tipo | Título | Subtítulo | Descripción |
|-------|------|--------|-----------|-------------|
| 1 | Problema | "¿Tu casa es un caos?" | "Encuentra tu silencio." | "Ruido de vecinos, familia, mascotas... Tu concentración merece algo mejor." |
| 2 | Propósito | "Tu futuro título" | "merece un espacio digno." | "Invierte en tu educación con un ambiente diseñado para el éxito académico." |
| 3 | Solución | "Reserva. Escanea. Estudia." | "Así de simple." | "En menos de 2 minutos estarás en tu cápsula personal de concentración." |

**Elementos:**
- Badge animado: "Cápsulas disponibles en Temuco" (punto pulsante verde)
- Botones CTA: "Reservar Ahora" y "Ver Precios"
- Indicadores de slide (dots)
- Indicador de scroll animado (mouse bouncing)
- Imágenes de fondo de Unsplash con overlay de gradiente oscuro
- Autoplay cada 5 segundos

---

### 3. 💎 Value Props (`value-props.tsx`)
Sección "¿Por qué elegir StudySpot?" con 3 tarjetas de beneficios.

**Título:** "¿Por qué elegir StudySpot?"
**Subtítulo:** "Diseñamos cada detalle pensando en tu concentración y comodidad."

**Tarjetas:**

| Beneficio | Icono | Descripción | Color Hover |
|-----------|-------|-------------|-------------|
| Aislamiento Acústico Total | `VolumeX` | "Paredes insonorizadas con tecnología de última generación. Cero distracciones, máxima concentración." | Violet |
| WiFi Fibra Dedicado | `Wifi` | "Conexión de alta velocidad exclusiva para tu cápsula. Sin cortes, sin lag, sin límites." | Cyan |
| Ubicación Estratégica | `MapPin` | "A pasos de las principales universidades de Temuco. Llegas rápido, estudias más." | Emerald |

---

### 4. 💰 Pricing (`pricing.tsx`)
Sección de precios con producto estrella.

**Título:** "Un solo precio, cero complicaciones"
**Subtítulo:** "Sin suscripciones, sin compromisos. Paga solo por lo que uses."
**Badge:** "Precio Simple" con icono `Zap`

**Producto Principal - "Pase Deep Focus":**
- **Precio:** $2.500 CLP por 1 hora
- **Badge:** "MÁS POPULAR"

**Especificaciones incluidas:**
| Spec | Icono |
|------|-------|
| Enchufe USB-C & USB-A | `Usb` |
| Escritorio Ergonómico | `MonitorDot` |
| WiFi 5G Dedicado | `Wifi` |
| Iluminación Ajustable | `Clock` |

**Indicador de Escasez:** "Solo quedan X cápsulas disponibles ahora" (punto rojo parpadeante, número dinámico entre 2-12)

**CTA:** Botón "Reservar Mi Cápsula"

---

### 5. 📝 Blog Preview (`blog-preview.tsx`)
Sección de preview del blog corporativo.

**Título:** "Blog StudySpot"
**Subtítulo:** "Tips, guías y recursos para potenciar tu estudio."
**Link:** "Ver todos los artículos" →

**Artículos:**

| Artículo | Categoría | Tiempo Lectura | Imagen |
|----------|-----------|----------------|--------|
| "Las 5 cafeterías con mejor WiFi en Temuco (y por qué no bastan)" | Productividad | 5 min | Cafetería con laptop |
| "Cómo vencer la procrastinación antes de exámenes" | Consejos | 7 min | Estudiante escribiendo |

---

### 6. 👥 About Us (`about-us.tsx`)
Sección "Quiénes Somos" con storytelling emotivo.

**Título:** "No somos una inmobiliaria, somos tu santuario"
**Label:** "Nuestra Historia"

**Historia (3 párrafos):**
1. "Nacimos de una frustración compartida: la imposibilidad de encontrar un espacio verdaderamente silencioso para estudiar en Temuco."
2. "Como estudiantes universitarios, entendemos que cada hora cuenta. Que un examen puede cambiar tu semestre. Que necesitas más que una mesa y un enchufe: necesitas un **refugio de concentración**."
3. "Por eso creamos StudySpot: cápsulas de estudio diseñadas por estudiantes que vivieron el problema, para estudiantes que buscan la solución."

**Quote:** *"Cada estudiante merece un espacio donde su único límite sea su propia capacidad."* — Equipo Fundador, StudySpot

**Floating Card:** "Hecho en Temuco - Por estudiantes, para estudiantes." (icono `Heart`)

**Imagen:** Equipo de trabajo colaborativo (Unsplash)

---

### 7. 🚀 CTA Final (`cta.tsx`)
Sección de llamada a la acción antes del footer.

**Badge:** "Empieza hoy mismo" (icono `Sparkles`)
**Título:** "Tu próximo logro académico comienza aquí"
**Subtítulo:** "Únete a cientos de estudiantes de Temuco que ya descubrieron el poder de la concentración total. Tu primera hora es la más importante."

**Botones:**
- "Reservar Mi Cápsula" (primario, con flecha →)
- "Conocer Ubicación" (outline)

**Trust Indicators:**
- Avatares: 4 iniciales (JP, MC, AR, LS) + "+500 estudiantes activos"
- Rating: ⭐⭐⭐⭐⭐ "4.9/5 valoración"

---

### 8. 🦶 Footer (`footer.tsx`)
Pie de página con información de contacto y navegación.

**Columnas:**

| Columna | Contenido |
|---------|-----------|
| **Brand** | Logo, descripción ("Tu santuario de concentración en Temuco..."), redes sociales |
| **Navegación** | Inicio, Beneficios, Precios, Blog, Nosotros |
| **Legal** | Términos de Servicio, Política de Privacidad, Política de Cancelación |
| **Contacto** | Av. Alemania 0123, Temuco / hola@studyspot.cl / +56 9 1234 5678 |

**Redes Sociales:**
- Instagram (icono `Instagram`)
- TikTok (icono `Music`)

**Footer Bottom:**
- Copyright: "© 2025 StudySpot. Todos los derechos reservados."
- Botón: "Volver arriba" (icono `ArrowUp`)

---

## 📄 Licencia

© 2025 StudySpot. Todos los derechos reservados.

---

## 👥 Equipo

Desarrollado por estudiantes de Temuco, para estudiantes.

> *"No somos una inmobiliaria, somos tu santuario."*
