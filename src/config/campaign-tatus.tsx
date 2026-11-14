import { AlertCircle, Ban, CheckCircle2, Clock, XCircle } from "lucide-react";

export const campaignStatusConfig = {
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
  ACTIVE: {
    label: "Active Campaign",
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  COMPLETED: {
    label: "Completed",
    color:
      "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400",
    icon: Ban,
  },
  EXPIRED: {
    label: "Expired",
    color:
      "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
    icon: AlertCircle,
  },
};
