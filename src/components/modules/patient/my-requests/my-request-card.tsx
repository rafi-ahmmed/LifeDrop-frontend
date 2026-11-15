"use client";

import {
  Calendar,
  Clock,
  Eye,
  MapPin,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  bloodRequestStatusConfig,
  formatBloodGroup,
} from "@/config/blood-request-status";
import type { TBloodRequest } from "@/types/blood-request.type";
import { DeleteRequestModal } from "./delete-request-modal";
import { RequestDetailsModal } from "./request-details-modal";

interface MyRequestCardProps {
  request: TBloodRequest;
}

export function MyRequestCard({ request }: MyRequestCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const currentStatus =
    bloodRequestStatusConfig[
      request.status as keyof typeof bloodRequestStatusConfig
    ] || bloodRequestStatusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  return (
    <>
      <div className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-primary to-rose-500/60" />

        <div className="space-y-3">
          {/* Header Row: Blood Group & Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-sm tracking-tight border border-rose-500/20 shadow-xs">
                {formatBloodGroup(request.bloodGroup)}
              </span>

              <div>
                <h3 className="font-bold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
                  {request.patientName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {request.units} Unit{request.units > 1 ? "s" : ""} •{" "}
                  {request.gender}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${currentStatus.color}`}
              >
                <StatusIcon className="w-3 h-3" />
                {currentStatus.label}
              </span>

              {request.urgency && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 animate-pulse">
                  <ShieldAlert className="w-3 h-3 text-rose-500" />
                  Urgent
                </span>
              )}
            </div>
          </div>

          {/* Reason & Location */}
          <div className="space-y-1.5 pt-1">
            <div className="text-xs text-foreground font-medium line-clamp-1">
              <span className="text-muted-foreground font-normal">
                Reason:{" "}
              </span>
              {request.reason}
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                {request.address ? `${request.address}, ` : ""}
                {request.district}
              </span>
            </p>
          </div>
        </div>

        {/* Needed By Info Strip */}
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            Needed By:
          </span>
          <span className="font-semibold text-foreground text-[11px]">
            {request.neededAt
              ? new Date(request.neededAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t text-xs">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            {request.createdAt
              ? new Date(request.createdAt).toLocaleDateString()
              : "N/A"}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => setDetailsOpen(true)}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              Details
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <RequestDetailsModal
        request={request}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <DeleteRequestModal
        request={request}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
