import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PrimeroseSection } from "@/components/sections/PrimeroseSection";
import { SmartLivingSection } from "@/components/sections/SmartLivingSection";
import { PartnershipsSection } from "@/components/sections/PartnershipsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PrimeroseSection />
        <SmartLivingSection />
        <PartnershipsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
