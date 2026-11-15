"use client";

import {
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  Heart,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { campaignStatusConfig } from "@/config/campaign-tatus";
import type { TFundCampaign } from "@/types/campaign.type";
import { DonateModal } from "./donate-modal";

interface CampaignDetailsModalProps {
  campaign: TFundCampaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDonateClick?: () => void;
}

export function CampaignDetailsModal({
  campaign,
  open,
  onOpenChange,
  onDonateClick,
}: CampaignDetailsModalProps) {
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  if (!campaign) return null;

  const currentStatus =
    campaignStatusConfig[campaign.status] || campaignStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  const target = Number(campaign.targetAmount) || 0;
  const collected = Number(campaign.collectedAmount) || 0;
  const remaining = Math.max(target - collected, 0);
  const progress =
    target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0;

  const deadlineDate = campaign.deadline ? new Date(campaign.deadline) : null;
  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border gap-0">
        {/* Top Gradient Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-rose-500 to-primary/60 shrink-0" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-3 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  {currentStatus.label}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Case
                </span>
              </div>

              <span className="text-[11px] text-muted-foreground font-mono">
                ID: {campaign.id.slice(0, 8)}...
              </span>
            </div>

            <DialogTitle className="text-xl sm:text-2xl font-bold leading-snug text-foreground">
              {campaign.title}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Comprehensive case details, financial progress, and verification
              documents.
            </DialogDescription>
          </DialogHeader>

          {/* Financial Progress Card */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border/80 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Raised
                </span>
                <p className="text-base sm:text-lg font-extrabold text-foreground">
                  ৳{collected.toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Goal
                </span>
                <p className="text-base sm:text-lg font-extrabold text-foreground">
                  ৳{target.toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  Needed
                </span>
                <p className="text-base sm:text-lg font-extrabold text-rose-600 dark:text-rose-400">
                  ৳{remaining.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border/50">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-medium text-muted-foreground">
                <span className="font-semibold text-primary">
                  {progress}% Funded
                </span>
                <span>
                  {daysLeft !== null && daysLeft > 0
                    ? `${daysLeft} days remaining`
                    : daysLeft === 0
                      ? "Deadline is today"
                      : "Campaign active"}
                </span>
              </div>
            </div>
          </div>

          {/* Patient & Medical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border bg-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] text-muted-foreground">
                  Patient Name
                </span>
                <p className="font-semibold text-foreground truncate">
                  {campaign.patientName}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border bg-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] text-muted-foreground">
                  Hospital / Clinic
                </span>
                <p className="font-semibold text-foreground truncate">
                  {campaign.hospitalName || "Not Specified"}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border bg-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] text-muted-foreground">
                  Emergency Contact
                </span>
                <p className="font-semibold text-foreground">
                  <a
                    href={`tel:${campaign.contactNumber}`}
                    className="hover:text-primary transition-colors hover:underline"
                  >
                    {campaign.contactNumber}
                  </a>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border bg-card flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] text-muted-foreground">
                  Deadline
                </span>
                <p className="font-semibold text-foreground">
                  {campaign.deadline
                    ? new Date(campaign.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "No deadline specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              Campaign Story & Description
            </span>
            <div className="bg-muted/30 border rounded-xl p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
              {campaign.description || "No description provided."}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4  flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto text-xs"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>

            <Button
              type="button"
              onClick={() => {
                if (onDonateClick) {
                  onDonateClick();
                } else {
                  setIsDonateOpen(true);
                }
              }}
              className="w-full sm:w-auto text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Donate Now</span>
            </Button>
          </div>
        </div>

        <DonateModal
          campaign={campaign}
          open={isDonateOpen}
          onOpenChange={setIsDonateOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
