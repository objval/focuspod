import dynamic from "next/dynamic";
import {
  HeroCarousel,
  ValueProps,
  Pricing,
} from "@/components/sections";

// Lazy load secciones below-the-fold para mejor performance inicial
const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: true }
);
const BlogPreview = dynamic(
  () => import("@/components/sections/blog-preview").then((m) => ({ default: m.BlogPreview })),
  { ssr: true }
);
const AboutUs = dynamic(
  () => import("@/components/sections/about-us").then((m) => ({ default: m.AboutUs })),
  { ssr: true }
);
const Location = dynamic(
  () => import("@/components/sections/location").then((m) => ({ default: m.Location })),
  { ssr: true }
);
const FAQ = dynamic(
  () => import("@/components/sections/faq").then((m) => ({ default: m.FAQ })),
  { ssr: true }
);
const CallToAction = dynamic(
  () => import("@/components/sections/cta").then((m) => ({ default: m.CallToAction })),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ValueProps />
      <Pricing />
      <Testimonials />
      <BlogPreview />
      <AboutUs />
      <Location />
      <FAQ />
      <CallToAction />
    </>
  );
}
