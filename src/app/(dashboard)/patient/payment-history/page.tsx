"use client";

import { CreditCard, Receipt } from "lucide-react";
import { Suspense } from "react";
import { PaymentHistorySkeleton } from "@/components/modules/patient/payment-history/payment-history-skeleton";
import { PaymentHistoryTable } from "@/components/modules/patient/payment-history/payment-history-table";

export default function PaymentHistoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto w-full relative">
      {/* Decorative ambient backlight */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shadow-inner shrink-0">
            <Receipt className="w-5 h-5 animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Payment History
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review and audit all your medical donation transactions, bKash
              receipts, and invoices.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Suspense & Skeleton */}
      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentHistoryTable />
      </Suspense>
    </div>
  );
}
