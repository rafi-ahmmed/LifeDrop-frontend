"use client";

import { Droplet, Heart, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmergencyCtaSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-rose-600 to-primary p-8 sm:p-12 md:p-16 text-primary-foreground shadow-2xl">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make an Impact Right Now</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Be the Reason Someone Survives Today.
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether by donating a bag of blood or contributing ৳500 to a
              child&apos;s heart surgery, your action can save a precious life.
              Join our growing community today.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                nativeButton={false}
                render={<Link href="/register" />}
                size="lg"
                className="w-full sm:w-auto h-12 px-7 rounded-xl bg-white text-primary hover:bg-white/90 font-bold shadow-lg shadow-black/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Droplet className="w-4 h-4 fill-primary text-primary" />
                <span>Become a Blood Donor</span>
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/patient/create-campaign" />}
                size="lg"
                className="w-full sm:w-auto h-12 px-7 rounded-xl bg-primary-foreground/20 hover:bg-primary-foreground/30 text-white border border-white/30 font-bold backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>Start a Medical Campaign</span>
              </Button>
            </div>

            {/* Badges footer */}
            <div className="pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Free & Transparent
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> 24/7 Emergency Line: +880
                1234-567890
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
