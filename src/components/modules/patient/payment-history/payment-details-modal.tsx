"use client";

import {
  AlertCircle,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  FileText,
  Hash,
  Receipt,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PaymentStatus, TPayment } from "@/types/payment.type";

interface PaymentDetailsModalProps {
  payment: TPayment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<
  PaymentStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  PAID: {
    label: "Payment Successful",
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
  },
  FAILED: {
    label: "Payment Failed",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Payment Cancelled",
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

export function PaymentDetailsModal({
  payment,
  open,
  onOpenChange,
}: PaymentDetailsModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!payment) return null;

  const currentStatus = statusConfig[payment.status] || statusConfig.UNPAID;
  const StatusIcon = currentStatus.icon;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gateway = payment.gatewayResponse || {};
  const formattedAmount = Number(payment.amount || 0).toLocaleString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 rounded-3xl border gap-0">
        {/* Accent top stripe */}
        <div
          className={`h-1.5 w-full ${
            payment.status === "PAID"
              ? "bg-emerald-500"
              : payment.status === "FAILED"
                ? "bg-rose-500"
                : "bg-amber-500"
          }`}
        />

        <div className="p-6 sm:p-7 space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-3 text-left">
            <div className="flex items-center justify-between gap-2 pr-8">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentStatus.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {currentStatus.label}
              </span>
              <span className="text-[11px] text-muted-foreground uppercase font-mono font-bold tracking-wider">
                {payment.method}
              </span>
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-foreground flex items-baseline gap-1">
                <span>৳{formattedAmount}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  BDT
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Transaction receipt and payment gateway audit records.
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Transaction Metadata Grid */}
          <div className="p-4 rounded-2xl bg-muted/40 border space-y-3 text-xs">
            {/* TrxID */}
            <div className="flex items-center justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-primary" />
                Transaction ID (TrxID)
              </span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-foreground">
                <span>{payment.trxID || "N/A"}</span>
                {payment.trxID && (
                  <button
                    type="button"
                    onClick={() => handleCopy(payment.trxID!, "trx")}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-0.5"
                    title="Copy TrxID"
                  >
                    {copiedKey === "trx" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* bKash Payment ID */}
            {payment.bkashPaymentId && (
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-primary" />
                  bKash Payment ID
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-foreground truncate max-w-[200px]">
                  <span className="truncate">{payment.bkashPaymentId}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(payment.bkashPaymentId!, "bkashId")
                    }
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer p-0.5"
                    title="Copy Payment ID"
                  >
                    {copiedKey === "bkashId" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Paid At */}
            <div className="flex items-center justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Date & Time
              </span>
              <span className="font-semibold text-foreground">
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </span>
            </div>

            {/* Patient Name */}
            {payment.campaign?.patientName && (
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Patient Name
                </span>
                <span className="font-semibold text-foreground">
                  {payment.campaign.patientName}
                </span>
              </div>
            )}

            {/* Campaign Target */}
            <div className="flex items-center justify-between py-1.5 border-b border-border/60">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" />
                Campaign Target
              </span>
              <span className="font-semibold text-[11px] text-foreground truncate max-w-[220px]">
                {payment.campaign?.title ||
                  `${payment.campaignId.slice(0, 16)}...`}
              </span>
            </div>

            {/* Payer Details from Gateway */}
            {gateway.payerAccount && (
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Payer Account
                </span>
                <span className="font-semibold text-foreground font-mono">
                  {String(gateway.payerAccount)}
                </span>
              </div>
            )}

            {gateway.merchantInvoiceNumber && (
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-primary" />
                  Merchant Invoice
                </span>
                <span className="font-mono text-[11px] text-foreground">
                  {String(gateway.merchantInvoiceNumber)}
                </span>
              </div>
            )}

            {/* Error Message if Failed/Cancelled */}
            {gateway.errorMessageEn && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Gateway Error:
                </p>
                <p className="text-[11px] leading-relaxed">
                  {String(gateway.errorMessageEn)} (Code:{" "}
                  {String(gateway.externalCode || "Unknown")})
                </p>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onOpenChange(false)}
            >
              Close Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
