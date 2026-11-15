"use client";

import { Ban, CheckCircle2, Eye, MapPin, UserRoundCheck } from "lucide-react";
import { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { formatBloodGroup } from "@/config/blood-request-status";
import {
  donorRequestStatusConfig,
  getDonorRequestActionAvailability,
  getDonorRequestActionDisabledReason,
} from "@/config/donor-request-status";
import { useUpdateDonorRequestStatus } from "@/hooks";
import type {
  BloodRequestStatus,
  DonorRequestStatusAction,
  TDonorRequest,
} from "@/types";
import { DonorRequestDetailsModal } from "./donor-request-details-modal";

interface DonorRequestRowProps {
  donorRequest: TDonorRequest;
  bloodRequestStatus: BloodRequestStatus;
}

export function DonorRequestRow({
  donorRequest,
  bloodRequestStatus,
}: DonorRequestRowProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { mutate: updateStatus, isPending } = useUpdateDonorRequestStatus();

  const { donor, status } = donorRequest;
  const currentStatus = donorRequestStatusConfig[status];
  const StatusIcon = currentStatus.icon;

  const availability = getDonorRequestActionAvailability(
    status,
    bloodRequestStatus,
  );

  const handleAction = (action: DonorRequestStatusAction) => {
    updateStatus(
      { donorRequestId: donorRequest.id, status: action },
      {
        onSuccess: (res) => {
          toast.add({
            title:
              (res as { message?: string })?.message ||
              `Request ${action.toLowerCase()} successfully`,
            description: `Donor request marked as ${action.toLowerCase()}.`,
            type: "success",
          });
        },
        onError: (err) => {
          const message =
            err instanceof FetchError
              ? err.data?.message || err.message
              : "Something went wrong";
          toast.add({ title: message, type: "error" });
        },
      },
    );
  };

  const actions: {
    key: DonorRequestStatusAction;
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }[] = [
    {
      key: "ACCEPTED",
      label: "Accept",
      icon: CheckCircle2,
      className:
        "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 dark:text-blue-400",
    },
    {
      key: "COMPLETED",
      label: "Complete",
      icon: UserRoundCheck,
      className:
        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 dark:text-emerald-400",
    },
    {
      key: "CANCELLED",
      label: "Cancel",
      icon: Ban,
      className:
        "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 dark:text-rose-400",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 p-4 rounded-xl border bg-background/60">
        {/* Donor summary */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-sm border border-rose-500/20 shrink-0">
              {formatBloodGroup(donor.bloodGroup)}
            </span>

            <div className="min-w-0 space-y-1">
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">
                  {donor.address}
                  {donor.district ? `, ${donor.district}` : ""}
                </span>
              </p>
              <p className="text-[11px] text-muted-foreground font-mono truncate">
                ID: {donor.id.slice(0, 8)}...
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${currentStatus.color}`}
          >
            <StatusIcon className="w-3 h-3" />
            {currentStatus.label}
          </span>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-3 gap-1.5"
            onClick={() => setDetailsOpen(true)}
          >
            <Eye className="w-3.5 h-3.5" />
            Details
          </Button>

          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            {actions.map((action) => {
              const ActionIcon = action.icon;
              const enabled = availability[action.key] && !isPending;
              const disabledReason = getDonorRequestActionDisabledReason(
                action.key,
                status,
                bloodRequestStatus,
              );

              return (
                <Button
                  key={action.key}
                  variant="outline"
                  size="sm"
                  disabled={!enabled}
                  title={!enabled ? disabledReason : undefined}
                  onClick={() => handleAction(action.key)}
                  className={`h-8 text-xs px-3 gap-1.5 font-semibold ${action.className}`}
                >
                  {isPending ? (
                    <Spinner className="w-3.5 h-3.5" />
                  ) : (
                    <ActionIcon className="w-3.5 h-3.5" />
                  )}
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <DonorRequestDetailsModal
        donorRequest={donorRequest}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
