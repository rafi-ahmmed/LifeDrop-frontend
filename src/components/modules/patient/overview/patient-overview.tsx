"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Droplet,
  FileCheck,
  FolderKanban,
  Heart,
  HeartHandshake,
  PhoneCall,
  PlusCircle,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/auth.hook";
import { useGetPatientStatsSuspense } from "@/hooks/patient.hook";
import type { TPatientStats } from "@/types/patient.type";

export function PatientOverview() {
  const { data: response } = useGetPatientStatsSuspense();
  const { data: meResponse } = useGetMe();

  const stats: TPatientStats = response?.data || {
    totalBloodRequests: 0,
    activeBloodRequests: 0,
    fulfilledBloodRequests: 0,
    totalFundCampaigns: 0,
  };

  const userName = meResponse?.data?.name || "Patient";

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-2 sm:p-4 md:p-6 relative">
      {/* Decorative ambient backlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Welcome & Greeting Banner */}
      <div className="relative overflow-hidden bg-card border rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl relative z-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patient Life-Line Center</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Welcome back, <span className="text-primary">{userName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Monitor all your active emergency blood requests, manage medical
            fundraising campaigns, and track life-saving contributions in one
            central place.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
          <Button
            nativeButton={false}
            render={<Link href="/patient/create-campaign" />}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-11 px-5 text-xs sm:text-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Campaign</span>
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/patient/my-campaigns" />}
            variant="outline"
            className="font-semibold rounded-xl h-11 px-5 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <FolderKanban className="w-4 h-4 text-primary" />
            <span>My Campaigns</span>
          </Button>
        </div>
      </div>

      {/* 2. Top 4 API Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Fund Campaigns */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-all space-y-4 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Fund Campaigns
            </span>
            <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-foreground">
              {stats.totalFundCampaigns}
            </p>
            <p className="text-xs text-muted-foreground">
              Medical fundraising campaigns
            </p>
          </div>
          <Link
            href="/patient/my-campaigns"
            className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1 pt-1 border-t border-border/60"
          >
            <span>Manage campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Total Blood Requests */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-rose-500/40 transition-all space-y-4 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Blood Requisitions
            </span>
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Droplet className="w-5 h-5 fill-rose-500" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-foreground">
              {stats.totalBloodRequests}
            </p>
            <p className="text-xs text-muted-foreground">
              Total emergency requests submitted
            </p>
          </div>
          <div className="pt-1 border-t border-border/60 text-[11px] text-muted-foreground">
            All hospital blood calls
          </div>
        </div>

        {/* Active Blood Requests */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Active Requests
            </span>
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-amber-500">
              {stats.activeBloodRequests}
            </p>
            <p className="text-xs text-muted-foreground">
              Awaiting matching donor response
            </p>
          </div>
          <div className="pt-1 border-t border-border/60">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                stats.activeBloodRequests > 0
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-emerald-500/10 text-emerald-600"
              }`}
            >
              {stats.activeBloodRequests > 0
                ? "Urgent Matching"
                : "No Pending Emergency"}
            </span>
          </div>
        </div>

        {/* Fulfilled Requests */}
        <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Fulfilled
            </span>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.fulfilledBloodRequests}
            </p>
            <p className="text-xs text-muted-foreground">
              Successfully matched & transfused
            </p>
          </div>
          <div className="pt-1 border-t border-border/60 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Lives safely supported</span>
          </div>
        </div>
      </div>

      {/* 3. Action Hub Cards (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Create Campaign Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between space-y-5 hover:border-primary/40 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-foreground">
              Raise Medical Funds
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Facing huge costs for heart surgery, chemotherapy, organ
              transplants, or ICU care? Launch a verified campaign in 3 minutes.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/patient/create-campaign" />}
            className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm gap-2"
          >
            <span>Start New Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Payment History Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-foreground">
              Payment & Donation Receipts
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Review all incoming donations, verified bKash payment receipts,
              and gateway transaction records for your campaigns.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/patient/payment-history" />}
            variant="outline"
            className="w-full h-11 rounded-xl font-semibold text-xs sm:text-sm gap-2"
          >
            <span>View Payment History</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 24/7 Hospital Hotline Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between space-y-5 hover:border-rose-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-foreground">
              24/7 Transfusion Emergency
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              If an emergency surgery or accident requires rare blood
              immediately, call our rapid hospital liaison emergency desk.
            </p>
          </div>
          <a
            href="tel:+8801234567890"
            className="w-full h-11 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-border transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-primary" />
            <span>+880 1234-567890</span>
          </a>
        </div>
      </div>

      {/* 4. Verification Guidelines & Trust Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/80 space-y-5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="font-bold text-base text-foreground">
            How to Get Medical Campaigns Verified Faster
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-card border space-y-1.5">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" />
              1. Doctor&apos;s Prescription
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Attach a clear hospital prescription with the doctor&apos;s
              official registration number and hospital seal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border space-y-1.5">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-primary" />
              2. Itemized Cost Estimation
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Include diagnostic bills, ICU admission receipts, or pharmacy
              quotes showing the exact target amount needed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-card border space-y-1.5">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-primary" />
              3. Reachable Contact
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Keep the patient attendee&apos;s phone number active. Our
              verification team calls within a few hours to authenticate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
