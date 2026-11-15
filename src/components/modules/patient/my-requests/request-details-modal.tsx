"use client";

import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Droplet,
  FileText,
  MapPin,
  Phone,
  ShieldAlert,
  User,
  Users,
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
import { toast } from "@/components/ui/toast";
import {
  bloodRequestStatusConfig,
  formatBloodGroup,
} from "@/config/blood-request-status";
import type { TBloodRequest } from "@/types/blood-request.type";

interface RequestDetailsModalProps {
  request: TBloodRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestDetailsModal({
  request,
  open,
  onOpenChange,
}: RequestDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!request) return null;

  const currentStatus =
    bloodRequestStatusConfig[
      request.status as keyof typeof bloodRequestStatusConfig
    ] || bloodRequestStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  const handleCopyPhone = () => {
    if (request.phone) {
      navigator.clipboard.writeText(request.phone);
      setCopied(true);
      toast.add({
        title: "Phone Copied",
        description: `${request.phone} copied to clipboard.`,
        type: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border">
        {/* Top Decorative Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-primary to-rose-500/60" />

        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex items-center justify-between gap-2 pr-6">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  {currentStatus.label}
                </span>

                {request.urgency && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400 animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                    Urgent
                  </span>
                )}
              </div>

              <span className="text-[11px] text-muted-foreground font-mono">
                ID: {request.id.slice(0, 8)}...
              </span>
            </div>

            <DialogTitle className="text-xl font-bold leading-snug text-foreground flex items-center gap-2">
              <span>{request.patientName}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-normal">
                {request.gender}
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Emergency blood donation request details and schedule.
            </DialogDescription>
          </DialogHeader>

          {/* Key Metrics Highlight Card */}
          <div className="p-4 rounded-xl bg-muted/40 border space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Blood Group */}
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Blood Group
                </span>
                <p className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  {formatBloodGroup(request.bloodGroup)}
                </p>
              </div>

              {/* Units Needed */}
              <div className="space-y-1">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Units Needed
                </span>
                <p className="text-2xl font-black text-foreground">
                  {request.units}{" "}
                  <span className="text-xs font-semibold text-muted-foreground">
                    Bag{request.units > 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="pt-2 border-t border-border/60">
              <span className="text-[11px] text-muted-foreground block mb-0.5">
                Medical Reason
              </span>
              <p className="text-xs font-semibold text-foreground">
                {request.reason}
              </p>
            </div>
          </div>

          {/* Details Rows */}
          <div className="space-y-3 text-xs">
            {/* Phone */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Contact Phone
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${request.phone}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {request.phone}
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

            {/* Address & District */}
            <div className="flex items-start justify-between py-2 border-b gap-4">
              <span className="text-muted-foreground flex items-center gap-2 shrink-0">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Hospital & District
              </span>
              <span className="font-semibold text-foreground text-right">
                {request.address}, {request.district}
              </span>
            </div>

            {/* Needed Date & Time */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                Needed By
              </span>
              <span className="font-semibold text-foreground">
                {request.neededAt
                  ? new Date(request.neededAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </span>
            </div>

            {/* Created At */}
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Submitted At
              </span>
              <span className="font-semibold text-foreground">
                {request.createdAt
                  ? new Date(request.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>

            {/* Description */}
            {request.description && (
              <div className="space-y-1.5 pt-1">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Additional Notes
                </span>
                <p className="text-muted-foreground leading-relaxed bg-card border rounded-lg p-3 max-h-32 overflow-y-auto">
                  {request.description}
                </p>
              </div>
            )}

            {/* Matching Donors Action (Shown ONLY when status is APPROVED or MATCHING) */}
            {(request.status === "APPROVED" ||
              request.status === "MATCHING") && (
              <div className="pt-2">
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href={`/patient/my-requests/${request.id}/matching-donors`}
                    />
                  }
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-rose-500 to-primary hover:opacity-95 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>View Matching Donors</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
