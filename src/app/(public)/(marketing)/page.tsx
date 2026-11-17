import { BloodMatcherSection } from "@/components/modules/home-page/blood-matcher-section";
import { EmergencyCtaSection } from "@/components/modules/home-page/emergency-cta-section";
import { FeaturedCampaignsSection } from "@/components/modules/home-page/featured-campaigns-section";
import { HeroSection } from "@/components/modules/home-page/hero-section";
import { HowItWorksSection } from "@/components/modules/home-page/how-it-works-section";
import { ImpactStatsSection } from "@/components/modules/home-page/impact-stats-section";
import { TestimonialsFaqSection } from "@/components/modules/home-page/testimonials-faq-section";

export default function HomePage() {
  // throw new Error("jdfjkdjkdfk");
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Live Emergency Board */}
      <HeroSection />

      {/* 2. Interactive Blood Group Compatibility Matcher */}
      <BloodMatcherSection />

      {/* 3. Featured Urgent Medical Campaigns */}
      <FeaturedCampaignsSection />

      {/* 4. How It Works (Donors, Patients, Hospitals) */}
      <HowItWorksSection />

      {/* 5. National Impact & Trust Pillars */}
      <ImpactStatsSection />

      {/* 6. Community Testimonials & Interactive FAQs */}
      <TestimonialsFaqSection />

      {/* 7. Emergency Call to Action */}
      <EmergencyCtaSection />
    </div>
  );
}
