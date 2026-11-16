"use client";

import { AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TFundCampaign } from "@/types";

interface ReviewConfirmationModalProps {
  campaign: TFundCampaign | null;
  actionType: "APPROVED" | "REJECTED" | null;
  open: boolean;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (rejectedReason?: string) => void;
}

export const ReviewConfirmationModal = ({
  campaign,
  actionType,
  open,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: ReviewConfirmationModalProps) => {
  const [rejectedReason, setRejectedReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setRejectedReason("");
      setError("");
    }
  }, [open]);

  if (!campaign || !actionType) return null;

  const isApprove = actionType === "APPROVED";

  const handleConfirmClick = () => {
    if (!isApprove) {
      if (!rejectedReason.trim()) {
        setError("Please provide a valid reason for rejecting this campaign.");
        return;
      }
      onConfirm(rejectedReason.trim());
    } else {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2.5">
            {isApprove ? (
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <DialogTitle className="text-base font-bold">
                {isApprove ? "Approve Campaign?" : "Reject Campaign?"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {campaign.title} — Patient: {campaign.patientName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-2 space-y-3 text-xs">
          {isApprove ? (
            <p className="text-muted-foreground leading-relaxed bg-muted/40 p-3.5 rounded-xl border border-dashed">
              Are you sure you want to approve this fundraising campaign for{" "}
              <span className="font-bold text-foreground">
                ৳{Number(campaign.targetAmount).toLocaleString()}
              </span>
              ? Once approved, it will become visible to donors for
              contributions.
            </p>
          ) : (
            <div className="space-y-2">
              <Label
                htmlFor="rejected-reason"
                className="text-xs font-bold text-foreground"
              >
                Rejection Reason <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="rejected-reason"
                placeholder="e.g., Contact number is not active or medical documents are unclear..."
                value={rejectedReason}
                onChange={(e) => {
                  setRejectedReason(e.target.value);
                  if (error) setError("");
                }}
                rows={3}
                className="text-xs resize-none"
              />
              {error && (
                <p className="text-[11px] font-medium text-rose-500">{error}</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className="text-xs h-9"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={isSubmitting}
            onClick={handleConfirmClick}
            className={`text-xs h-9 gap-1.5 ${
              isApprove
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isApprove ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <XCircle className="w-3.5 h-3.5" />
            )}
            <span>{isApprove ? "Confirm Approval" : "Confirm Rejection"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
