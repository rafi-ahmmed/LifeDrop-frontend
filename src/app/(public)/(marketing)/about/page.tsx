import { AboutHero } from "@/components/modules/about-us/about-hero";
import { AdvisoryTeam } from "@/components/modules/about-us/advisory-team";
import { CoreValues } from "@/components/modules/about-us/core-values";
import { OurStory } from "@/components/modules/about-us/our-story";
import { PartnerNetwork } from "@/components/modules/about-us/partner-network";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. About Hero Section with National Stats */}
      <AboutHero />

      {/* 2. Our Origin Story & Mission / Vision */}
      <OurStory />

      {/* 3. Guiding Core Values */}
      <CoreValues />

      {/* 4. Leadership & Medical Advisory Board */}
      <AdvisoryTeam />

      {/* 5. Partner Hospital Network & Action Call */}
      <PartnerNetwork />
    </div>
  );
}
