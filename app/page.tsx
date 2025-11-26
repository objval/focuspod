import {
  Navbar,
  HeroCarousel,
  ValueProps,
  Pricing,
  Testimonials,
  BlogPreview,
  AboutUs,
  Location,
  FAQ,
  CallToAction,
  Footer,
} from "@/components/sections";
import { ShowcaseMode } from "@/components/showcase-mode";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <ValueProps />
        <Pricing />
        <Testimonials />
        <BlogPreview />
        <AboutUs />
        <Location />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
      <ShowcaseMode />
    </>
  );
}
