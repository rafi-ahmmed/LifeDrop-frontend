"use client";

import { Building2, Heart, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const hospitals = [
  "Dhaka Medical College Hospital (DMCH)",
  "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
  "National Institute of Cardiovascular Diseases (NICVD)",
  "National Heart Foundation Hospital & Research Institute",
  "Chittagong Medical College Hospital (CMCH)",
  "Sylhet MAG Osmani Medical College Hospital",
  "Rajshahi Medical College Hospital (RMCH)",
  "Square Hospitals Ltd., Dhaka",
];

export function PartnerNetwork() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Hospital Network Badges */}
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Connected Across Leading Healthcare Institutions
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Collaborating with government and private hospital ERs and blood
              banks across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {hospitals.map((hosp) => (
              <div
                key={hosp}
                className="p-4 rounded-2xl bg-card border border-border/80 text-xs font-semibold text-foreground/90 flex items-center justify-center text-center shadow-xs hover:border-primary/40 transition-colors"
              >
                <Building2 className="w-4 h-4 text-primary shrink-0 mr-2" />
                <span className="line-clamp-2">{hosp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Join the Movement CTA Banner */}
        <div className="rounded-3xl bg-muted/40 border border-border p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Ready to Stand With Us?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
              Your blood donation or medical fund pledge can give a father, a
              mother, or a child their tomorrow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-11 px-6 text-xs sm:text-sm"
            >
              Register as Donor
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/campaigns" />}
              variant="outline"
              className="font-semibold rounded-xl h-11 px-6 text-xs sm:text-sm"
            >
              Explore Campaigns
            </Button>
          </div>

          <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" /> +880 1234-567890
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" /> support@lifedrop.org
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
