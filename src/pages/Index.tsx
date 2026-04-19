import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Gallery } from "@/components/portfolio/Gallery";
import { About } from "@/components/portfolio/About";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { RequestForm } from "@/components/portfolio/RequestForm";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <Gallery />
      <About />
      <Testimonials />
      <RequestForm />
      <Footer />
    </main>
  );
};

export default Index;
