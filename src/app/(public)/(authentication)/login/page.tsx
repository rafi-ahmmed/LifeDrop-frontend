import { HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import { LoginForm } from "@/components/from/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background text-foreground">
      {/* Left Column: Form & Brand Logo */}
      <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12">
        {/* Brand Header */}
        <Logo />
        {/* Center: Login Form Container (Perfectly Centered) */}
        <div className="flex-1 flex items-center justify-center my-auto py-6">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Column: Visual Feature Banner (Visible on Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-muted/40 border-l border-border overflow-hidden">
        {/* Subtle Background Accent Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Medical Network
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Connecting Life Savers in Real Time
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Access immediate blood donation requests, manage fundraising
            campaigns, and sync with hospital networks safely.
          </p>
        </div>

        {/* Highlight Stats / Feature Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-4 pt-8">
          <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="text-2xl font-bold text-primary">2,500+</div>
            <div className="text-xs text-muted-foreground mt-1">
              Active Donors Ready
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Verified Hospitals
            </div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <HeartHandshake className="w-4 h-4 text-primary shrink-0" />
          <span>Every drop counts. Thank you for being a hero.</span>
        </div>
      </div>
    </div>
  );
}
