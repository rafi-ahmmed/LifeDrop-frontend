"use client";

import { Droplet, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/40">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission & Purpose</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
          Bridging the Critical Distance Between{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-500 to-primary">
            Life and Hope
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          LifeDrop is Bangladesh&apos;s unified emergency blood donation and
          verified medical crowdfunding platform—empowering citizens to save
          lives when every single minute matters.
        </p>

        {/* Quick Highlights Strip */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-border/60">
          <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1">
            <Droplet className="w-5 h-5 text-primary mx-auto" />
            <h4 className="text-xl font-black text-foreground">15,000+</h4>
            <p className="text-xs text-muted-foreground">Blood Donors</p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1">
            <Heart className="w-5 h-5 text-rose-500 mx-auto" />
            <h4 className="text-xl font-black text-foreground">৳3.4 Cr+</h4>
            <p className="text-xs text-muted-foreground">Medical Aid</p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1">
            <Users className="w-5 h-5 text-emerald-500 mx-auto" />
            <h4 className="text-xl font-black text-foreground">64</h4>
            <p className="text-xs text-muted-foreground">Districts Active</p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-1">
            <ShieldCheck className="w-5 h-5 text-primary mx-auto" />
            <h4 className="text-xl font-black text-foreground">100%</h4>
            <p className="text-xs text-muted-foreground">Free & Verified</p>
          </div>
        </div>
      </div>
    </section>
  );
}
