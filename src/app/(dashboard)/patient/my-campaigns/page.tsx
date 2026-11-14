"use client";
import { useGetCampaigns } from "@/hooks";

export default function MyCampaignsPage() {
  const { data: campaigns, isLoading } = useGetCampaigns();
  console.log(campaigns);
  return (
    <div>
      <h1>My Campaigns</h1>
    </div>
  );
}
