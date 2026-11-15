"use client";

import { Droplet, MapPin, Users } from "lucide-react";
import {
  bloodRequestStatusConfig,
  formatBloodGroup,
} from "@/config/blood-request-status";
import type { TBloodRequestWithDonorRequests } from "@/types";
import { DonorRequestRow } from "./donor-request-row";

interface DonorRequestBloodRequestCardProps {
  bloodRequest: TBloodRequestWithDonorRequests;
}

export function DonorRequestBloodRequestCard({
  bloodRequest,
}: DonorRequestBloodRequestCardProps) {
  const currentStatus =
    bloodRequestStatusConfig[
      bloodRequest.status as keyof typeof bloodRequestStatusConfig
    ] || bloodRequestStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-primary to-rose-500/60" />

      {/* Blood request header */}
      <div className="flex flex-wrap items-start justify-between gap-3 p-5 border-b bg-muted/20">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-base border border-rose-500/20 shrink-0">
            {formatBloodGroup(bloodRequest.bloodGroup)}
          </span>

          <div className="min-w-0 space-y-1">
            <h3 className="font-bold text-foreground text-base flex items-center gap-2">
              {formatBloodGroup(bloodRequest.bloodGroup)} Blood Request
              <span className="text-xs font-semibold text-muted-foreground">
                • {bloodRequest.units} Unit{bloodRequest.units > 1 ? "s" : ""}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">
                {bloodRequest.address}
                {bloodRequest.district ? `, ${bloodRequest.district}` : ""}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${currentStatus.color}`}
          >
            <StatusIcon className="w-3 h-3" />
            {currentStatus.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-rose-500" />
            {bloodRequest.donorRequests.length} donor request
            {bloodRequest.donorRequests.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Donor requests */}
      <div className="p-5 space-y-3">
        {bloodRequest.donorRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <Droplet className="w-8 h-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No donors have been notified for this request yet.
            </p>
          </div>
        ) : (
          bloodRequest.donorRequests.map((donorRequest) => (
            <DonorRequestRow
              key={donorRequest.id}
              donorRequest={donorRequest}
              bloodRequestStatus={bloodRequest.status}
            />
          ))
        )}
      </div>
    </div>
  );
}
