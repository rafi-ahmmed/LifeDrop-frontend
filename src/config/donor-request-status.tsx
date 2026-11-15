import {
  BadgeCheck,
  Ban,
  CheckCircle2,
  Clock,
  HandHeart,
  Undo2,
  XCircle,
} from "lucide-react";
import type {
  BloodRequestStatus,
  DonorRequestStatus,
  DonorRequestStatusAction,
} from "@/types";

export const donorRequestStatusConfig = {
  PENDING: {
    label: "Pending",
    color:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    icon: Clock,
  },
  INTERESTED: {
    label: "Interested",
    color: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
    icon: HandHeart,
  },
  ACCEPTED: {
    label: "Accepted",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    icon: CheckCircle2,
  },
  DECLINED: {
    label: "Declined",
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400",
    icon: Ban,
  },
  WITHDRAWN: {
    label: "Withdrawn",
    color: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400",
    icon: Undo2,
  },
  COMPLETED: {
    label: "Completed",
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    icon: BadgeCheck,
  },
} satisfies Record<
  DonorRequestStatus,
  { label: string; color: string; icon: typeof Clock }
>;

export type DonorRequestActionAvailability = Record<
  DonorRequestStatusAction,
  boolean
>;

export const getDonorRequestActionAvailability = (
  donorRequestStatus: DonorRequestStatus,
  bloodRequestStatus: BloodRequestStatus,
): DonorRequestActionAvailability => {
  const isBloodRequestFulfilled = bloodRequestStatus === "FULFILLED";
  const canTransition =
    donorRequestStatus === "INTERESTED" || donorRequestStatus === "ACCEPTED";

  return {
    ACCEPTED: !isBloodRequestFulfilled && donorRequestStatus === "INTERESTED",
    CANCELLED: !isBloodRequestFulfilled && canTransition,
    COMPLETED: !isBloodRequestFulfilled && donorRequestStatus === "ACCEPTED",
  };
};

/** Human-readable reason for why an action button is disabled. */
export const getDonorRequestActionDisabledReason = (
  action: DonorRequestStatusAction,
  donorRequestStatus: DonorRequestStatus,
  bloodRequestStatus: BloodRequestStatus,
): string | undefined => {
  if (bloodRequestStatus === "FULFILLED") {
    return "The blood request is already fulfilled";
  }

  if (action === "COMPLETED" && donorRequestStatus !== "ACCEPTED") {
    return "Only accepted donor requests can be completed";
  }

  if (
    donorRequestStatus !== "INTERESTED" &&
    donorRequestStatus !== "ACCEPTED"
  ) {
    return "You cannot update this request from its current state";
  }

  return undefined;
};
