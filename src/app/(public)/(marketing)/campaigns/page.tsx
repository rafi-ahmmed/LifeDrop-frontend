import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import AllCampaignsList from "@/components/modules/campaigns/all-campaigns-list";
import { AllCampaignsSkeleton } from "@/components/modules/campaigns/all-campaigns-skeleton";

export const metadata: Metadata = {
  title: "Fundraising Campaigns",
  description:
    "Explore verified medical fundraising campaigns and help patients in need through LifeDrop.",
};

export default function CampaignsPage() {
  return (
    <div className="container mx-auto px-4 md:px-4 lg:px-0 py-8 md:py-10 space-y-10 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1st Section: Page Banner */}
      <div className="relative overflow-hidden bg-card border rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl relative z-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Empowering Lives Through{" "}
            <span className="text-primary">Medical Fundraising</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Explore active medical campaigns, support patients in critical need,
            and make a meaningful impact with your generous contribution.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto relative z-10">
          <div className="bg-muted/50 border p-4 rounded-2xl text-center space-y-1 sm:min-w-[130px]">
            <HeartHandshake className="w-5 h-5 text-primary mx-auto" />
            <h4 className="text-sm font-bold text-foreground">100% Trusted</h4>
            <p className="text-[10px] text-muted-foreground">Verified Cases</p>
          </div>
          <div className="bg-muted/50 border p-4 rounded-2xl text-center space-y-1 sm:min-w-[130px]">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-foreground">Secure Pay</h4>
            <p className="text-[10px] text-muted-foreground">bKash & Cards</p>
          </div>
        </div>
      </div>

      {/* Campaigns List Section */}
      <div className="w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Active Fundraising Campaigns
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Browse through all ongoing medical emergencies and contribute to
              save lives.
            </p>
          </div>
        </div>
        <Suspense fallback={<AllCampaignsSkeleton />}>
          <AllCampaignsList />
        </Suspense>
      </div>
    </div>
  );
}
