"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Droplet,
  Heart,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border/40 min-h-[620px] sm:min-h-[680px] md:min-h-[720px] lg:min-h-[760px] flex items-center">
      {/* 1. Full-Width Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      {/* 2. Cinematic Gradient Overlays for High Contrast & Visual Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-primary/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-black/50" />

      {/* 3. Subtle Medical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* 4. Banner Content Aligned with Navbar */}
      <div className="relative z-10 w-full py-16 sm:py-20 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Headlines & Action CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Emergency Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-rose-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                <span>24/7 National Emergency Blood & Medical Aid Network</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight leading-[1.1] text-white">
                  Donate Blood.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-200">
                    Fund Hope.
                  </span>{" "}
                  Save Lives.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed pt-1">
                  Connecting voluntary blood donors, patients, and hospitals
                  across 64 districts in real-time. Transparent, verified, and
                  completely free for every citizen.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  nativeButton={false}
                  render={<Link href="/register" />}
                  size="lg"
                  className="h-12 px-7 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 flex items-center gap-2 cursor-pointer text-sm"
                >
                  <Droplet className="w-4 h-4 fill-white" />
                  <span>Become a Blood Donor</span>
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/campaigns" />}
                  size="lg"
                  className="h-12 px-7 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold backdrop-blur-md flex items-center gap-2 cursor-pointer text-sm"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Explore Campaigns</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Key Highlights */}
              <div className="flex flex-wrap items-center gap-5 pt-4 text-xs text-zinc-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100%
                  Prescription Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0%
                  Platform Fee
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-rose-400" /> 24/7 Hotline:
                  +880 1234-567890
                </span>
              </div>
            </div>

            {/* Right Column: Floating Glassmorphism Emergency Showcase Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-zinc-900/65 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-rose-400 flex items-center justify-center">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        Live Emergency Network
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        Active hospital response across 64 districts
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    LIVE
                  </span>
                </div>

                {/* Emergency Matching Previews */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary text-white font-black flex items-center justify-center text-sm shadow-sm">
                        O+
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">
                          Dhaka Medical College
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          2 Bags needed for surgery
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-md">
                      Urgent
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                        B-
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">
                          Chittagong Medical
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          1 Bag rare donor matched
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                      Connected
                    </span>
                  </div>
                </div>

                {/* Impact Numbers Strip */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xl font-black text-white">15.8k+</p>
                    <p className="text-[10px] text-zinc-400 font-medium">
                      Donors
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-rose-300">৳3.4Cr+</p>
                    <p className="text-[10px] text-zinc-400 font-medium">
                      Aid Raised
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-emerald-300">64</p>
                    <p className="text-[10px] text-zinc-400 font-medium">
                      Districts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
