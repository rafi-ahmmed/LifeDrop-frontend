"use client";

import { Calendar, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { campaignStatusConfig } from "@/config/campaign-tatus";
import type { Campaign } from "@/types/campaign.type";
import { CampaignDetailsModal } from "./campaign-details-modal";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const currentStatus =
    campaignStatusConfig[campaign.status] || campaignStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  const [open, setOpen] = useState(false);

  const progress = Math.min(
    Math.round(
      ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100,
    ),
    100,
  );

  return (
    <div>
      <div className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-rose-500/60" />

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
              {campaign.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border shrink-0 ${currentStatus.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {currentStatus.label}
            </span>
          </div>
          {campaign.hospitalName && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              🏥 {campaign.hospitalName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">
              Raised:{" "}
              <strong className="text-foreground">
                ৳{(campaign.raisedAmount || 0).toLocaleString()}
              </strong>
            </span>
            <span className="text-muted-foreground">
              Goal:{" "}
              <strong className="text-foreground">
                ৳{(campaign.goalAmount || 0).toLocaleString()}
              </strong>
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-[10px] text-muted-foreground">
            {progress}% Funded
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {campaign.createdAt
              ? new Date(campaign.createdAt).toLocaleDateString()
              : "N/A"}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => setOpen(true)}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <CampaignDetailsModal
        campaign={campaign}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
