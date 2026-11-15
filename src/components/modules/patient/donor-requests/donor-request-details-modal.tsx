"use client";

import {
  Calendar,
  Check,
  Copy,
  Droplet,
  Lock,
  MapPin,
  Phone,
  User,
  UserCheck,
  Venus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { formatBloodGroup } from "@/config/blood-request-status";
import { donorRequestStatusConfig } from "@/config/donor-request-status";
import type { TDonorRequest } from "@/types";

interface DonorRequestDetailsModalProps {
  donorRequest: TDonorRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonorRequestDetailsModal({
  donorRequest,
  open,
  onOpenChange,
}: DonorRequestDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!donorRequest) return null;

  const { donor, status } = donorRequest;
  const currentStatus = donorRequestStatusConfig[status];
  const StatusIcon = currentStatus.icon;

  const isContactRevealed = status === "ACCEPTED" && !!donor.phone;

  const handleCopyPhone = () => {
    if (!donor.phone) return;
    navigator.clipboard.writeText(donor.phone);
    setCopied(true);
    toast.add({
      title: "Phone Copied",
      description: `${donor.phone} copied to clipboard.`,
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border">
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-primary to-rose-500/60" />

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
                ID: {donor.id.slice(0, 8)}...
              </span>
            </div>

            <DialogTitle className="text-xl font-bold leading-snug text-foreground flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-sm border border-rose-500/20">
                {formatBloodGroup(donor.bloodGroup)}
              </span>
              Donor Details
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Review this donor&apos;s information and contact details.
            </DialogDescription>
          </DialogHeader>

          {/* Donor summary */}
          <div className="p-4 rounded-xl bg-muted/40 border space-y-3 text-xs">
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground flex items-center gap-2">
                <Droplet className="w-4 h-4 text-rose-500" />
                Blood Group
              </span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {formatBloodGroup(donor.bloodGroup)}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 py-1 border-t border-border/60">
              <span className="text-muted-foreground flex items-center gap-2 shrink-0">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Location
              </span>
              <span className="font-semibold text-foreground text-right">
                {donor.address}
                {donor.district ? `, ${donor.district}` : ""}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-border/60">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Availability
              </span>
              <span
                className={`font-semibold ${
                  donor.availability
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                }`}
              >
                {donor.availability ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {/* Contact details — only revealed once the request is accepted */}
          {isContactRevealed ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Contact Phone
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${donor.phone}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {donor.phone}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPhone}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              {donor.gender && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Venus className="w-4 h-4 text-primary" />
                    Gender
                  </span>
                  <span className="font-semibold text-foreground capitalize">
                    {donor.gender.toLowerCase()}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>
                  Donor accepted — you can reach out to coordinate the donation.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground">
              <Lock className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Phone and gender are hidden until you accept this donor&apos;s
                request.
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground font-mono">
            <User className="w-3.5 h-3.5" />
            Donor ID: {donor.id}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
