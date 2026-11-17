import {
  AlertTriangle,
  Clock,
  Droplet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { CreateBloodRequestForm } from "@/components/from/create-blood-request-form";

export const metadata: Metadata = {
  title: "Create Blood Request",
  description:
    "Submit an emergency blood requisition and find matching donors near you.",
};

export default function CreateBloodRequestPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6 max-w-5xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 shadow-inner">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              Create Blood Request
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Submit an emergency blood requisition to find matching donors near
              you.
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border text-xs text-muted-foreground font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verified Donor Network</span>
        </div>
      </div>

      {/* Quick Tips Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-foreground">
              Accurate Details:
            </span>{" "}
            Provide the correct blood group and contact number so donors can
            reach you immediately.
          </div>
        </div>
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/50 border text-xs">
          <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-foreground">
              Faster Matching:
            </span>{" "}
            Urgent requests are prioritized and donors near your district are
            notified first.
          </div>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="bg-card border rounded-2xl shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500/50 via-primary to-rose-500/50" />

        <CreateBloodRequestForm />
      </div>
    </div>
  );
}
