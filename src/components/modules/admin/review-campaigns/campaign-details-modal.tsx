"use client";

import {
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  HandCoins,
  Phone,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TFundCampaign } from "@/types";

interface CampaignDetailsModalProps {
  campaign: TFundCampaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CampaignDetailsModal = ({
  campaign,
  open,
  onOpenChange,
}: CampaignDetailsModalProps) => {
  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-4 gap-2">
            <DialogTitle className="text-base font-bold leading-snug">
              {campaign.title}
            </DialogTitle>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">
              {campaign.status}
            </span>
          </div>
          <DialogDescription className="text-[11px] pt-1">
            Campaign ID: {campaign.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* ফান্ডিং টার্গেট ও কালেক্টেড */}
          <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3.5 rounded-xl border border-dashed">
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <HandCoins className="w-3.5 h-3.5 text-primary" /> Target Amount
              </p>
              <p className="font-extrabold text-foreground text-sm">
                ৳{Number(campaign.targetAmount).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Deadline
              </p>
              <p className="font-bold text-foreground text-sm">
                {new Date(campaign.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* পেশেন্ট ও হাসপাতাল তথ্য */}
          <div className="space-y-2.5 bg-card border rounded-xl p-3.5">
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Patient Name</p>
                <p className="font-semibold text-foreground">
                  {campaign.patientName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Hospital Name</p>
                <p className="font-semibold text-foreground">
                  {campaign.hospitalName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground">Contact Number</p>
                <p className="font-semibold text-foreground">
                  {campaign.contactNumber}
                </p>
              </div>
            </div>
          </div>

          {/* ডেসক্রিপশন */}
          <div className="bg-muted/40 p-3.5 rounded-xl space-y-1">
            <p className="font-semibold text-foreground">Campaign Story:</p>
            <p className="text-muted-foreground leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {campaign.medicalDocuments?.length > 0 && (
            <div className="space-y-2">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" /> Medical Documents
                ({campaign.medicalDocuments.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {campaign.medicalDocuments.map((doc, index) => (
                  <a
                    key={doc.publicId}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground truncate">
                      Document #{index + 1} (PDF)
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* রিজেক্ট হয়ে থাকলে কারণ দেখাবে */}
          {campaign.status === "REJECTED" && campaign.rejectedReason && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl space-y-1">
              <p className="font-bold text-rose-600">Rejection Reason:</p>
              <p className="text-rose-600/90">{campaign.rejectedReason}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
