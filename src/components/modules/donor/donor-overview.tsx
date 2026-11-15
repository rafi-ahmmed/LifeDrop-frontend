"use client";

import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useGetDonorStatsSuspense, useUpdateDonorAvailability } from "@/hooks";

export const DonorOverview = () => {
  const { data: response } = useGetDonorStatsSuspense();
  const { mutate } = useUpdateDonorAvailability();
  const { statistics, eligibility, availability } = response.data;
  const [isAvailable, setIsAvailable] = useState<boolean>(availability);

  const handleToggleAvailability = (checked: boolean) => {
    setIsAvailable(checked);
    mutate(checked);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Donor Dashboard
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Welcome Back, Life Saver!
          </h1>
          <p className="text-xs text-muted-foreground">
            Here is your live blood donation activity, eligibility status, and
            availability overview.
          </p>
        </div>

        {/* স্ট্যাটাস বক্স + Shadcn Switch বাটন */}
        <div className="flex items-center justify-between sm:justify-start gap-4 bg-muted/60 border px-4 py-2.5 rounded-xl w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-3 h-3 rounded-full shrink-0 ${
                isAvailable ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
              }`}
            />
            <div className="text-xs">
              <p className="text-muted-foreground">Availability Status</p>
              <p className="font-bold text-foreground">
                {isAvailable
                  ? "Available for Donation"
                  : "Currently Unavailable"}
              </p>
            </div>
          </div>

          <Switch
            checked={isAvailable}
            onCheckedChange={handleToggleAvailability}
            aria-label="Toggle donor availability"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Donations */}
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Total Donations
            </p>
            <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
              {statistics.totalDonations}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Completed Requests
            </p>
            <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
              {statistics.completedRequests}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Pending Responses
            </p>
            <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
              {statistics.pendingResponses}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Accepted Responses
            </p>
            <h3 className="text-2xl font-extrabold text-foreground mt-0.5">
              {statistics.acceptedResponses}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Donation Eligibility
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${eligibility.isEligible ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
            >
              {eligibility.isEligible
                ? "Eligible to Donate"
                : "Not Eligible Yet"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <p className="text-muted-foreground">Last Donated At</p>
              <p className="font-bold text-foreground">
                {eligibility.lastDonatedAt
                  ? new Date(eligibility.lastDonatedAt).toLocaleDateString()
                  : "Never Donated"}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-xl space-y-1">
              <p className="text-muted-foreground">Next Eligible Date</p>
              <p className="font-bold text-foreground">
                {eligibility.nextEligibleDate
                  ? new Date(eligibility.nextEligibleDate).toLocaleDateString()
                  : "Available Now"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Cooldown Period
            </h3>
            <p className="text-xs text-muted-foreground">
              Safe donation interval guidelines for your health and recovery.
            </p>
          </div>

          <div className="bg-muted/40 border border-dashed rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Remaining cooldown days:
            </span>
            <span className="text-lg font-extrabold text-primary">
              {eligibility.remainingDays} Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
