"use client";

import {
  CheckCircle2,
  HeartHandshake,
  Home,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useGetAdminStatsSuspense,
  useGetAllCampaigns,
  useGetCampaigns,
  useGetMyPayments,
  useGetPatientStats,
} from "@/hooks";

export default function SuccessPage() {
  const { refetch: reloadCampaigns } = useGetCampaigns();
  const { refetch: reloadAllCampaigns } = useGetAllCampaigns();
  const { refetch: reloadPayments } = useGetMyPayments();
  const { refetch: reloadAdminStats } = useGetAdminStatsSuspense();
  const { refetch: reloadPatientStats } = useGetPatientStats();

  const btnCallback = () => {
    reloadCampaigns();
    reloadAllCampaigns();
    reloadPayments();
    reloadAdminStats();
    reloadPatientStats();
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-8 shadow-xl text-center space-y-6 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />

        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-25" />
          <CheckCircle2 className="w-11 h-11 text-emerald-500" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Payment Confirmed
          </span>

          <h1 className="text-2xl font-extrabold tracking-tight text-foreground pt-1">
            Thank You for Your Generosity!
          </h1>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Your donation has been successfully processed. Your contribution
            directly helps a patient receive critical medical care.
          </p>
        </div>

        <div className="bg-muted/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">LifeDrop Fund</p>
              <p className="text-[11px] text-muted-foreground">
                Receipt sent to your email
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            COMPLETED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            onClick={btnCallback}
            variant="outline"
            className="h-10 text-xs font-semibold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Go to Home</span>
          </Button>

          <Button
            nativeButton={false}
            onClick={btnCallback}
            render={<Link replace href="/patient/payment-history" />}
            className="h-10 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center justify-center gap-1.5"
          >
            <ReceiptText className="w-3.5 h-3.5" />
            <span>Payment History</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
