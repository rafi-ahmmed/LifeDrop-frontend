"use client";

import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetCampaignsSuspense } from "@/hooks";
import type { Campaign } from "@/types/campaign.type";
import { CampaignDetailsModal } from "./campaign-details-modal";
import { CampaignCard } from "./my-campaign-card";

const MyCampaignList = () => {
  const { data: response } = useGetCampaignsSuspense();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  const campaignsList: Campaign[] = Array.isArray(response?.data)
    ? response.data
    : (response?.data as any)?.campaigns || [];

  if (campaignsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-2xl text-center space-y-4 my-8 relative z-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
          <FolderOpen className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base">No campaigns found</h3>
          <p className="text-xs text-muted-foreground">
            You haven&apos;t created any medical fundraising campaigns yet.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/create-campaign" />}
          variant="outline"
          size="sm"
        >
          Create your first campaign
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {campaignsList.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <CampaignDetailsModal
        campaign={selectedCampaign}
        open={!!selectedCampaign}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedCampaign(null);
        }}
      />
    </>
  );
};

export default MyCampaignList;
