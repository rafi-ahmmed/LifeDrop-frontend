"use client";

import { AlertTriangle, FolderOpen, RefreshCw } from "lucide-react";
import { useGetAllCampaignsSuspense } from "@/hooks";
import type { TFundCampaign } from "@/types/campaign.type";
import { AllCampaignCard } from "./all-campaigns-card";
import { Button } from "@base-ui/react";

const AllCampaignsList = () => {
  const { data: response,isError,refetch } = useGetAllCampaignsSuspense();

  const campaignsList: TFundCampaign[] = Array.isArray(response?.data)
    ? response.data
    : (response?.data as any)?.campaigns || [];

  console.log(response);

  if (isError || !response) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card border border-border rounded-3xl space-y-4 max-w-lg mx-auto my-8 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground">
            Failed to load campaigns
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Could not connect to the server. The server might be offline or undergoing maintenance. Please check your connection.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          className="text-xs font-semibold gap-1.5 rounded-xl cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </Button>
      </div>
    );
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {campaignsList.map((campaign) => (
        <AllCampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default AllCampaignsList;
