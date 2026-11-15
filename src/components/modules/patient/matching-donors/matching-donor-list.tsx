"use client";

import { CheckCircle2, Send, Users } from "lucide-react";
import { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useMatchingDonorSuspense, useSendDonorRequests } from "@/hooks";
import type { TDonorMatchingParams, TMatchingDonorsResponse } from "@/types";
import { MatchingDonorCard } from "./matching-donor-card";

type MatchingDonorListProps = {
  requestId: string;
  params: TDonorMatchingParams;
};

export function MatchingDonorList({
  requestId,
  params,
}: MatchingDonorListProps) {
  const { data } = useMatchingDonorSuspense(requestId, params);
  const { mutate: sendRequests, isPending } = useSendDonorRequests();

  const result = (data as { data: TMatchingDonorsResponse }).data;
  const donors = result?.matchingDonors ?? [];
  const unsentDonorIds = result?.unsentDonorIds ?? [];
  const unsentSet = new Set(unsentDonorIds);

  const handleSendAll = () => {
    if (unsentDonorIds.length === 0) return;
    sendRequests(
      { requestId, donorIds: unsentDonorIds },
      {
        onSuccess: (res) => {
          const r = res as { success: boolean; message?: string };
          if (!r.success) {
            toast.add({
              title: "Failed",
              description: "Please try again",
              type: "error",
            });
            return;
          }
          toast.add({
            title: "Requests Sent!",
            description: `Donor request sent to ${unsentDonorIds.length} donor(s).`,
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

  if (donors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="p-4 rounded-full bg-muted/50">
          <Users size={36} className="text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold text-foreground">
          No matching donors found
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Try loosening the filters — uncheck &quot;Exact District&quot; or
          &quot;Exact Location&quot; to find more donors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Send to All bar — only when there are unsent donors */}
      {unsentDonorIds.length > 0 ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">
              {unsentDonorIds.length}
            </span>{" "}
            donor(s) haven&apos;t been notified yet.
          </p>
          <Button
            onClick={handleSendAll}
            disabled={isPending}
            className="flex items-center gap-2 text-sm"
          >
            {isPending ? (
              <>
                <Spinner />
                Sending…
              </>
            ) : (
              <>
                <Send size={15} />
                Send to All
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            All matching donors have already been notified. No further action
            needed.
          </p>
        </div>
      )}

      {/* Donor cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map((donor) => (
          <MatchingDonorCard
            key={donor.id}
            donor={donor}
            isSent={!unsentSet.has(donor.id)}
          />
        ))}
      </div>
    </div>
  );
}
