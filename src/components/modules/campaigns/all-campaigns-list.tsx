"use client";

import { FolderOpen } from "lucide-react";
import { useGetAllCampaignsSuspense } from "@/hooks";
import type { TFundCampaign } from "@/types/campaign.type";
import { AllCampaignCard } from "./all-campaigns-card";

const AllCampaignsList = () => {
  const { data: response } = useGetAllCampaignsSuspense();

  const campaignsList: TFundCampaign[] = Array.isArray(response?.data)
    ? response.data
    : (response?.data as any)?.campaigns || [];

  console.log(response);

  if (campaignsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-card border rounded-2xl text-center space-y-4 my-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          <FolderOpen className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-lg">No campaigns available</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            There are currently no active fundraising campaigns. Please check
            back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
      {campaignsList.map((campaign) => (
        <AllCampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default AllCampaignsList;
