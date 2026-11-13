import { HeartHandshake, ShieldCheck, Sparkles, FileText } from "lucide-react";
import { CreateCampaignForm } from "@/components/from/create-campaign-from";

export default function CreateCampaignPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-1 max-w-4xl mx-auto w-full">
      {/* Page Header with Gradient Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shadow-inner">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              Create Fund Campaign
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Launch a verified medical fundraising campaign to get financial
              support.
            </p>
          </div>
        </div>

        {/* Trust Badge / Info Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border text-xs text-muted-foreground font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verified & Secure Process</span>
        </div>
      </div>

      {/* Quick Tips Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-primary/5 border border-primary/10 text-xs">
          <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-foreground">
              Accurate Documents:
            </span>{" "}
            Make sure your prescription and reports are clear and readable.
          </div>
        </div>
        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/50 border text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-foreground">
              Fast Verification:
            </span>{" "}
            Campaigns with complete hospital details get verified faster.
          </div>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="bg-card border rounded-2xl shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

        <CreateCampaignForm />
      </div>
    </div>
  );
}