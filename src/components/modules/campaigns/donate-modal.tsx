"use client";

import { AlertCircle, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { FetchError } from "ofetch";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useCreatePaymentByBkash } from "@/hooks/payment.hook";
import type { TFundCampaign } from "@/types/campaign.type";

interface DonateModalProps {
  campaign: TFundCampaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_AMOUNTS = [200, 500, 1000, 2000, 5000];

export function DonateModal({
  campaign,
  open,
  onOpenChange,
}: DonateModalProps) {
  const [amount, setAmount] = useState<string>("1000");
  const [error, setError] = useState<string | null>(null);

  const { mutate: createPayment, isPending } = useCreatePaymentByBkash();

  // Reset error when modal opens
  useEffect(() => {
    if (open) {
      setError(null);
    }
  }, [open]);

  if (!campaign) return null;

  const target = Number(campaign.targetAmount) || 0;
  const collected = Number(campaign.collectedAmount) || 0;
  const remaining = Math.max(target - collected, 0);

  const handlePay = () => {
    const numAmount = Number(amount);

    // 1. Validate > 0
    if (!amount || Number.isNaN(numAmount) || numAmount <= 0) {
      setError("Donation amount must be greater than 0 TK.");
      return;
    }

    // 2. Validate Minimum 10 TK
    if (numAmount < 10) {
      setError("Minimum donation amount is ৳10.");
      return;
    }

    // 3. Validate Remaining Target (if remaining target is available)
    if (remaining > 0 && numAmount > remaining) {
      setError(
        `Donation amount cannot exceed the remaining target of ${remaining.toLocaleString()} TK.`,
      );
      return;
    }

    setError(null);

    createPayment(
      {
        campaignId: campaign.id,
        amount: numAmount,
      },
      {
        onSuccess: (res: any) => {
          if (res?.data?.paymentUrl) {
            toast.add({
              title: "Redirecting to bKash",
              description:
                "Please complete your donation securely on the bKash payment gateway.",
              type: "success",
            });
            window.location.href = res.data.paymentUrl;
          } else {
            const msg = res?.message || "Payment URL could not be generated";
            setError(msg);
            toast.add({
              title: "Payment Error",
              description: msg,
              type: "error",
            });
          }
        },
        onError: (err: any) => {
          // Extract backend API error message
          const message =
            err instanceof FetchError
              ? err.data?.message || err.message
              : err?.data?.message ||
                err?.message ||
                "Failed to initiate payment. Please try again.";

          // Keep modal open and display the exact error message inside the modal
          setError(message);

          toast.add({
            title: "Payment Failed",
            description: message,
            type: "error",
          });
        },
      },
    );
  };

  const handleClose = () => {
    if (!isPending) {
      setError(null);
      onOpenChange(false);
    }
  };

  const isAmountInvalid =
    !amount || Number(amount) <= 0 || Number.isNaN(Number(amount));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-3xl border">
        {/* Top Decorative Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-primary to-rose-500" />

        <div className="p-6 space-y-5">
          {/* Header */}
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-center justify-between pr-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>bKash Secure Donation</span>
              </span>

              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Verified
              </span>
            </div>

            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Donate to Campaign
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground line-clamp-1">
              {campaign.title}
              {campaign.patientName ? ` • For ${campaign.patientName}` : ""}
            </DialogDescription>
          </DialogHeader>

          {/* Campaign Summary & Remaining Target Mini Box */}
          <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-medium">
                Patient Case:
              </span>
              <p className="font-bold text-foreground">
                {campaign.patientName || "Anonymous Patient"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-[11px]">
              <div>
                <span className="text-muted-foreground">Raised So Far:</span>
                <p className="font-bold text-foreground">
                  ৳{collected.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Remaining Needed:</span>
                <p className="font-extrabold text-primary">
                  ৳{remaining.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="donation-amount"
                className="text-xs font-semibold"
              >
                Enter Donation Amount (BDT)
              </Label>
              {remaining > 0 && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  Max: ৳{remaining.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quick Amount Preset Chips */}
            <div className="grid grid-cols-5 gap-1.5">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(String(preset));
                    setError(null);
                  }}
                  className={`h-9 rounded-xl text-xs font-bold transition-all border ${
                    amount === String(preset)
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card hover:bg-muted text-muted-foreground border-border/80"
                  }`}
                >
                  ৳{preset}
                </button>
              ))}
            </div>

            {/* Amount Custom Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-base pointer-events-none select-none">
                ৳
              </span>
              <Input
                id="donation-amount"
                type="number"
                min={1}
                step={50}
                placeholder="Enter amount (min ৳10)"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className={`pl-8 text-base font-bold h-11 rounded-xl ${
                  error
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }`}
              />
            </div>

            {/* In-Modal Error Alert Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{error}</span>
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">
              Your contribution will directly fund verified hospital treatments
              and medical procedures.
            </p>
          </div>

          {/* Action Buttons: Cancel & Pay */}
          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleClose}
              className="rounded-xl h-10 px-5 text-xs font-semibold"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isPending || isAmountInvalid}
              onClick={handlePay}
              className="rounded-xl h-10 px-6 text-xs font-bold bg-[#E2136E] hover:bg-[#c20f5e] text-white shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Spinner /> Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    Pay ৳
                    {Number(amount) > 0 ? Number(amount).toLocaleString() : "0"}
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
