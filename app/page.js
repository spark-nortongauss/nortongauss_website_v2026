import Hero from "./_components/Hero";
import About from "./_components/About";
import Services from "./_components/Services";
import UseCases from "./_components/UseCases";
import GlobalOps from "./_components/GlobalOps";

import FullscreenLogo from "./_components/FullscreenLogo";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Services />
      <UseCases />
      <GlobalOps />
      <FullscreenLogo />
      <Footer />
    </main>
  );
}
