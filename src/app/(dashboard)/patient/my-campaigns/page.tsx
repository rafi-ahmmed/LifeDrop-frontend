"use client";

import { FolderKanban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import MyCampaignList from "@/components/modules/patient/my-campaign.tsx/my-campaign-list";
import { MyCampaignSkeleton } from "@/components/modules/patient/my-campaign.tsx/my-campaign-skeleton";
import { Button } from "@/components/ui/button";

export default function MyCampaignsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto w-full relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shadow-inner shrink-0">
            <FolderKanban className="w-5 h-5 animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              My Campaigns
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage and track all your medical fundraising campaigns in one
              place.
            </p>
          </div>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/patient/create-campaign" />}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm animate-pulse"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Suspense fallback={<MyCampaignSkeleton />}>
        <MyCampaignList />
      </Suspense>
    </div>
  );
}
