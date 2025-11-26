import {
  Navbar,
  HeroCarousel,
  ValueProps,
  Pricing,
  BlogPreview,
  AboutUs,
  CallToAction,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <ValueProps />
        <Pricing />
        <BlogPreview />
        <AboutUs />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
