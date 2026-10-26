import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  HeartHandshake,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/assets/svg/Logo";
import VerifyAccountForm from "@/components/from/registration/verify-account-from";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background text-foreground">
      {/* Left Column: Form & Brand Logo */}
      <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-y-auto h-svh">
        {/* Brand Header */}
        <Logo />

        {/* Center Container: OTP Verification Box */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-sm space-y-6">
            {/* Header Icon & Title */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Verify Your Account
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We sent a 6-digit verification code to your email. Enter the
                code below to verify your account.
              </p>
            </div>

            {/* 5 Minutes Expiry Notice Badge */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
              <Clock className="w-4 h-4 shrink-0" />
              <span>
                This verification code will expire in <strong>5 minutes</strong>
                .
              </span>
            </div>

            {/* OTP Form UI */}
            <Suspense fallback={<div>Loading...</div>}>
              <VerifyAccountForm />
            </Suspense>

            {/* Back to Login Link */}
            <div className="pt-4 border-t border-border/60 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Feature Banner (Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-muted/40 border-l border-border overflow-hidden h-svh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Account Security
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Protecting Our Blood Donation Network
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Verifying your identity ensures that requests and donations remain
            authentic, reliable, and safe for patients in critical need.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-foreground">
                Verified Donors & Patients
              </h4>
              <p className="text-xs text-muted-foreground">
                Prevents spam requests and protects patient privacy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-foreground">
                Instant Notification Sync
              </h4>
              <p className="text-xs text-muted-foreground">
                Get instant alerts for emergency blood requests in your area.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <HeartHandshake className="w-4 h-4 text-primary shrink-0" />
          <span>Thank you for being part of LifeDrop community.</span>
        </div>
      </div>
    </div>
  );
}
