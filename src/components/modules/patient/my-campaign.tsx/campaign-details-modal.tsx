"use client";

import {
  Building2,
  Calendar,
  Clock,
  FileText,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { campaignStatusConfig } from "@/config/campaign-tatus";
import type { Campaign } from "@/types/campaign.type";

interface CampaignDetailsDialogProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignDetailsModal({
  campaign,
  open,
  onOpenChange,
}: CampaignDetailsDialogProps) {
  if (!campaign) return null;

  const currentStatus =
    campaignStatusConfig[campaign.status] || campaignStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  const progress = Math.min(
    Math.round(
      ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100,
    ),
    100,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-rose-500 to-primary/60" />

        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex items-center justify-between gap-2 pr-6">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {currentStatus.label}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                ID: {campaign.id.slice(0, 8)}...
              </span>
            </div>

            <DialogTitle className="text-xl font-bold leading-snug text-foreground">
              {campaign.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Detailed overview and fundraising progress of your medical
              campaign.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-xl bg-muted/40 border space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Raised Amount
                </span>
                <p className="text-lg font-extrabold text-foreground">
                  ৳{(campaign.raisedAmount || 0).toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Target Goal
                </span>
                <p className="text-lg font-extrabold text-foreground">
                  ৳{(campaign.goalAmount || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>{progress}% Completed</span>
                <span>
                  Remaining: ৳
                  {Math.max(
                    (campaign.goalAmount || 0) - (campaign.raisedAmount || 0),
                    0,
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Patient Name */}
            {(campaign as any).patientName && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Patient Name
                </span>
                <span className="font-semibold text-foreground">
                  {(campaign as any).patientName}
                </span>
              </div>
            )}

            {campaign.hospitalName && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Hospital Name
                </span>
                <span className="font-semibold text-foreground">
                  {campaign.hospitalName}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Created Date
              </span>
              <span className="font-semibold text-foreground">
                {campaign.createdAt
                  ? new Date(campaign.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>

            {/* Deadline */}
            {(campaign as any).deadline && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500" />
                  Deadline
                </span>
                <span className="font-semibold text-foreground">
                  {new Date((campaign as any).deadline).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            )}

            {(campaign as any).description && (
              <div className="space-y-1.5 pt-1">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Campaign Description
                </span>
                <p className="text-muted-foreground leading-relaxed bg-card border rounded-lg p-3 max-h-32 overflow-y-auto">
                  {(campaign as any).description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
