import { Banner } from "@/components/Banner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FasilitasSection } from "@/components/LogoTicker";
import { LocationDetail } from "@/components/Features";
import { FAQs } from "@/components/FAQs";
import { LeadForm } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { PromoLaunchingSection } from "@/components/PromoLaunchingSection";
import { VillaBenefitsPage } from "@/components/Benefit";


export default function Home() {
  return (
    <>
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <PromoLaunchingSection />
      <VillaBenefitsPage />
      <FasilitasSection />
      
      <LocationDetail />
      
      <FAQs />
     
      <LeadForm />
      </div>
      <Footer />
    </>
  );
}
