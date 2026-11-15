"use client";

import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  Receipt,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyPaymentsSuspense } from "@/hooks/payment.hook";
import type {
  PaymentMethod,
  PaymentStatus,
  TPayment,
} from "@/types/payment.type";
import { PaymentDetailsModal } from "./payment-details-modal";

const statusConfig: Record<
  PaymentStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  PAID: {
    label: "Paid",
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
  },
  FAILED: {
    label: "Failed",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    color:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: AlertCircle,
  },
  UNPAID: {
    label: "Unpaid",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    icon: Clock,
  },
};

const methodConfig: Record<PaymentMethod, { label: string; color: string }> = {
  BKASH: {
    label: "bKash",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  },
  SSLCOMMERZ: {
    label: "SSLCommerz",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  STRIPE: {
    label: "Stripe",
    color:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  },
};

export function PaymentHistoryTable() {
  const { data: response } = useGetMyPaymentsSuspense();

  const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Normalize payments data safely
  const rawList: TPayment[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray((response as any)?.payments)
      ? (response as any).payments
      : [];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Compute summary metrics for top cards
  const stats = useMemo(() => {
    let totalPaid = 0;
    let successfulCount = 0;
    let failedCount = 0;

    rawList.forEach((p) => {
      const amt = Number(p.amount) || 0;
      if (p.status === "PAID") {
        totalPaid += amt;
        successfulCount += 1;
      } else if (p.status === "FAILED" || p.status === "CANCELLED") {
        failedCount += 1;
      }
    });

    return {
      totalPaid,
      totalCount: rawList.length,
      successfulCount,
      failedCount,
    };
  }, [rawList]);

  return (
    <div className="space-y-6">
      {/* 1. Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Paid Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Total Contributed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            ৳{stats.totalPaid.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Successfully completed transactions
          </p>
        </div>

        {/* Total Transactions Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Total Attempts
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            {stats.totalCount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            All gateway checkout sessions
          </p>
        </div>

        {/* Successful Transactions */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Successful
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.successfulCount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Verified donation receipts
          </p>
        </div>

        {/* Failed / Cancelled Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              Failed / Cancelled
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-500">
            {stats.failedCount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Incomplete checkout attempts
          </p>
        </div>
      </div>

      {/* 2. Shadcn Payments Table */}
      {rawList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-2xl text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Receipt className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-foreground">
            No payment records found
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm">
            You haven&apos;t made any donations or payments yet.
          </p>
        </div>
      ) : (
        <div className="bg-card border rounded-2xl overflow-hidden shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-12 text-xs font-bold">#</TableHead>
                <TableHead className="text-xs font-bold">
                  Patient & Campaign
                </TableHead>
                <TableHead className="text-xs font-bold">
                  Transaction & IDs
                </TableHead>
                <TableHead className="text-xs font-bold">Amount</TableHead>
                <TableHead className="text-xs font-bold">Method</TableHead>
                <TableHead className="text-xs font-bold">Status</TableHead>
                <TableHead className="text-xs font-bold">Paid At</TableHead>
                <TableHead className="text-xs font-bold text-right pr-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawList.map((payment, index) => {
                const status =
                  statusConfig[payment.status] || statusConfig.UNPAID;
                const StatusIcon = status.icon;

                const method = methodConfig[payment.method] || {
                  label: payment.method,
                  color: "bg-muted text-foreground border-border",
                };

                return (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {/* Index */}
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    {/* Patient & Campaign Column */}
                    <TableCell className="max-w-[220px]">
                      <div className="space-y-1">
                        <p
                          className="font-bold text-xs text-foreground truncate"
                          title={payment.campaign?.title || "Medical Campaign"}
                        >
                          {payment.campaign?.title || "Medical Campaign"}
                        </p>
                        {payment.campaign?.patientName && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold truncate">
                            <User className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {payment.campaign.patientName}
                            </span>
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* TrxID / Payment ID */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-foreground">
                          <span>{payment.trxID || "—"}</span>
                          {payment.trxID && (
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(payment.trxID!, `trx-${payment.id}`)
                              }
                              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                              title="Copy TrxID"
                            >
                              {copiedKey === `trx-${payment.id}` ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                        {payment.bkashPaymentId && (
                          <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[180px]">
                            ID: {payment.bkashPaymentId}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Amount */}
                    <TableCell>
                      <span className="font-black text-sm text-foreground">
                        ৳{Number(payment.amount || 0).toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Method */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${method.color}`}
                      >
                        {method.label}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{status.label}</span>
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right pr-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs px-2.5 rounded-lg cursor-pointer"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 3. Payment Details Modal */}
      <PaymentDetailsModal
        payment={selectedPayment}
        open={!!selectedPayment}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedPayment(null);
        }}
      />
    </div>
  );
}
