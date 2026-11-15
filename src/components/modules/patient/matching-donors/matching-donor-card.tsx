"use client";

import { MapPin, User } from "lucide-react";
import { formatBloodGroup } from "@/config/blood-request-status";
import type { TMatchingDonor } from "@/types";

type MatchingDonorCardProps = {
  donor: TMatchingDonor;
  isSent: boolean;
};

export function MatchingDonorCard({ donor, isSent }: MatchingDonorCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Top row: blood group badge + sent badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400">
          <span className="text-base">🩸</span>
          {formatBloodGroup(donor.bloodGroup)}
        </span>
        {isSent ? (
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400">
            ✓ Notified
          </span>
        ) : (
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:text-amber-400">
            Pending Notify
          </span>
        )}
      </div>

      {/* Donor info */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User size={14} className="shrink-0" />
          <span className="font-mono text-xs text-foreground/60 truncate">
            {donor.id}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="shrink-0 text-primary" />
          <span>
            {donor.address},{" "}
            <span className="font-medium text-foreground">
              {donor.district}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
