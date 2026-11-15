import {
  AlertCircle,
  Ban,
  CheckCircle2,
  Clock,
  Sparkles,
  XCircle,
} from "lucide-react";

export const bloodRequestStatusConfig = {
  PENDING: {
    label: "Pending Review",
    color:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    icon: Clock,
  },
  APPROVED: {
    label: "Approved",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    icon: CheckCircle2,
  },
  MATCHING: {
    label: "Matching",
    color:
      "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    icon: Sparkles,
  },
  ACTIVE: {
    label: "Active Request",
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    icon: Sparkles,
  },
  FULFILLED: {
    label: "Fulfilled",
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400",
    icon: XCircle,
  },
  EXPIRED: {
    label: "Expired",
    color:
      "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
    icon: AlertCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400",
    icon: Ban,
  },
};

export const formatBloodGroup = (group: string): string => {
  const map: Record<string, string> = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-",
  };
  return map[group] || group;
};
