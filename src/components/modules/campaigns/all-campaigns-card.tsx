"use client";

import {
  ArrowRight,
  Building2,
  Calendar,
  Eye,
  Heart,
  HeartHandshake,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/auth.hook";
import type { TFundCampaign } from "@/types/campaign.type";
import { CampaignDetailsModal } from "./campaign-details-modal";
import { DonateModal } from "./donate-modal";

interface AllCampaignCardProps {
  campaign: TFundCampaign;
}

export const AllCampaignCard = ({ campaign }: AllCampaignCardProps) => {
  const router = useRouter();
  const { data: userResponse } = useGetMe();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const handleDonateClick = () => {
    if (!userResponse?.data) {
      router.push("/login");
      return;
    }
    setIsDetailsOpen(false);
    setIsDonateOpen(true);
  };
  const progress = Math.min(
    Math.round(
      ((Number(campaign.collectedAmount) || 0) /
        (Number(campaign.targetAmount) || 1)) *
        100,
    ),
    100,
  );

  return (
    <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative p-5 space-y-4">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary/60 z-10" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
            LifeDrop Emergency
          </span>
        </div>
        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
          {campaign.status || "ACTIVE"}
        </span>
      </div>

      <div className="space-y-2">
        {campaign.patientName && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Patient: {campaign.patientName}</span>
          </div>
        )}

        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>

        {campaign.hospitalName && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{campaign.hospitalName}</span>
          </p>
        )}
      </div>

      <div className="space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-zinc-500 dark:text-zinc-400">
            Raised:{" "}
            <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
              ৳{(Number(campaign.collectedAmount) || 0).toLocaleString()}
            </strong>
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            Goal:{" "}
            <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
              ৳{(Number(campaign.targetAmount) || 0).toLocaleString()}
            </strong>
          </span>
        </div>

        <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-200 dark:border-zinc-700">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
          <span className="font-semibold text-primary">{progress}% Funded</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {campaign.createdAt
              ? new Date(campaign.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        </div>
      </div>

      {/* দুটি বাটন (View Details Modal এবং Donate) */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDetailsOpen(true)}
          className="h-9 text-xs font-semibold shadow-none border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Details</span>
        </Button>

        <Button
          type="button"
          onClick={handleDonateClick}
          className="h-9 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center justify-center gap-1.5 group/btn cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Donate Now</span>
        </Button>
      </div>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal
        campaign={campaign}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onDonateClick={handleDonateClick}
      />

      {/* Donate Modal */}
      <DonateModal
        campaign={campaign}
        open={isDonateOpen}
        onOpenChange={setIsDonateOpen}
      />
    </div>
  );
};
