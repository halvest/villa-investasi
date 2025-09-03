import { Navbar } from "@/components/Navbar";
import { PromoBanner } from "@/components/PromoBanner";
import { Hero } from "@/components/Hero";
import { FasilitasSection } from "@/components/Fasilitas";
import { PromoLaunchingSection } from "@/components/PromoLaunchingSection";
import { LocationDetail } from "@/components/Lokasi";
import { FAQs } from "@/components/FAQs";
import { LeadForm } from "@/components/Leadform";
import { Footer } from "@/components/Footer";
import { VillaBenefitsPage } from "@/components/Benefit";
import { BEPCalculator } from "@/components/Kalkulatorbep";
import PaymentSchedulePage from "@/components/Pembayaran";

export default function Home() {
  return (
    <>
      {/* Navbar sticky tetap di luar wrapper */}
      <Navbar />
      
      <div className="overflow-x-clip">
        <PromoBanner />
        <Hero />
        <VillaBenefitsPage />
        <FasilitasSection />
        <LocationDetail />
        <PaymentSchedulePage />
        <BEPCalculator />
        <FAQs />
        <LeadForm />
      </div>

      <Footer />
    </>
  );
}
