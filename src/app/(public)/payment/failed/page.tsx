"use client";

import {
  AlertTriangle,
  Home,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FailedPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-8 shadow-xl text-center space-y-6 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-500" />

        <div className="mx-auto w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping opacity-20" />
          <XCircle className="w-11 h-11 text-rose-500" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Transaction Failed
          </span>

          <h1 className="text-2xl font-extrabold tracking-tight text-foreground pt-1">
            Payment Could Not Be Completed
          </h1>

          <p className="text-xs text-muted-foreground leading-relaxed">
            We couldn&apos;t process your donation due to a network issue,
            insufficient balance, or payment cancellation. Please try again.
          </p>
        </div>

        <div className="bg-muted/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                No Funds Deducted
              </p>
              <p className="text-[11px] text-muted-foreground">
                If charged, it auto-refunds in 3–5 days
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-500/10 px-2.5 py-1 rounded-md">
            FAILED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            nativeButton={false}
            render={<Link replace href="/" />}
            variant="outline"
            className="h-10 text-xs font-semibold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Go to Home</span>
          </Button>

          <Button
            nativeButton={false}
            render={<Link replace href="/campaigns" />}
            className="h-10 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
