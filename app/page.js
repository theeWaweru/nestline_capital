// app/page.js - Nestline Capital Premium Homepage
import HeroSection from "@/components/homepage/HeroSection";
import OpportunitySection from "@/components/homepage/OpportunitySection";
import InvestmentTypes from "@/components/homepage/InvestmentTypes";
import FeaturedProject from "@/components/homepage/FeaturedProject";
import ServicesSection from "@/components/homepage/ServicesSection";
import PipelineSection from "@/components/homepage/PipelineSection";
import AboutSection from "@/components/homepage/AboutSection";
import FinalCTA from "@/components/homepage/FinalCTA";

export const metadata = {
  title: "Nestline Capital - Trusted Pathways to Prosperity",
  description:
    "Building wealth and creating value through strategic coastal real estate investments in Malindi, Kenya. Land banking, diaspora solutions, and gated communities.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      <HeroSection />
      <OpportunitySection />
      <InvestmentTypes />
      <FeaturedProject />
      <ServicesSection />
      <PipelineSection />
      <AboutSection />
      <FinalCTA />
    </main>
  );
}
