import { HandCoins } from "lucide-react";
import { Suspense } from "react";
import { ReviewCampaignsSkeleton } from "@/components/modules/admin/review-campaigns/review-campaigns-skeleton";
import { ReviewCampaignsTable } from "@/components/modules/admin/review-campaigns/review-campaigns-table";

export default function ReviewCampaignsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      {/* স্ট্যাটিক পেজ হেডার */}
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <HandCoins className="w-3.5 h-3.5" />
            Fundraising Verification
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Review Fund Campaigns
          </h1>
          <p className="text-xs text-muted-foreground">
            Verify medical documents, review patient details, and approve or
            reject fundraising campaigns.
          </p>
        </div>
      </div>

      <Suspense fallback={<ReviewCampaignsSkeleton />}>
        <ReviewCampaignsTable />
      </Suspense>
    </div>
  );
}
