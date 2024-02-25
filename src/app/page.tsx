import Container from "@/components/Container";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <main className="space-y-40 mb-40">
      <Container>
        <HeroSection />
        <Features />
      </Container>

      {/* <Stats /> */}
      {/* <Testimonials /> */}
      {/* <CallToAction /> */}
      {/* <Blog /> */}
    </main>
  );
};

export default Home;
