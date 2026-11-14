import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Suspense } from "react";
import AllCampaignsList from "@/components/modules/campaigns/all-campaigns-list";
import { AllCampaignsSkeleton } from "@/components/modules/campaigns/all-campaigns-skeleton";

export default function CampaignsPage() {
  return (
    <div className="flex flex-1 flex-col gap-10 p-4 md:p-8  mx-auto w-full relative ">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative overflow-hidden bg-card border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Support</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Empowering Lives Through{" "}
            <span className="text-primary">Medical Fundraising</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Explore active medical campaigns, support patients in critical need,
            and make a meaningful impact with your generous contribution.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-auto relative z-10">
          <div className="bg-muted/50 border p-4 rounded-xl text-center space-y-1">
            <HeartHandshake className="w-5 h-5 text-primary mx-auto" />
            <h4 className="text-sm font-bold">100% Trusted</h4>
            <p className="text-[10px] text-muted-foreground">Verified Cases</p>
          </div>
          <div className="bg-muted/50 border p-4 rounded-xl text-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold">Secure Pay</h4>
            <p className="text-[10px] text-muted-foreground">bKash & Cards</p>
          </div>
        </div>
      </div>

      <div className=" max-w-7xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4">
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
