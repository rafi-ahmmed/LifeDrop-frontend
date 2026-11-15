"use client";

import { CheckCircle2, HeartHandshake, Lightbulb, Target } from "lucide-react";

export function OurStory() {
  return (
    <section className="py-16 md:py-24 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>How We Started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              A Platform Born From Emergency Rooms & Community Compassion
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                In Bangladesh, over <strong>800,000 bags of blood</strong> are
                needed annually, yet patients and their frantic families still
                scramble on social media groups and hospital corridors during
                midnight emergencies.
              </p>
              <p>
                At the same time, thousands of young children and elderly
                patients suffer from treatable heart conditions, kidney
                failures, and cancer simply because their families lack the
                sudden financial resources for expensive surgeries.
              </p>
              <p>
                <strong>LifeDrop was built to solve both.</strong> By pairing a
                fast, direct blood donor notification system with a 100%
                verified, zero-fee medical crowdfunding engine, we ensure that
                no life is lost due to geographical distance or lack of
                immediate funds.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Doctor-Audited Prescriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct Donor Contact Sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero Platform Fees for Emergencies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>bKash, Nagad & Card Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                To build South Asia&apos;s most reliable, transparent, and
                decentralized healthcare emergency network—connecting patients,
                hospitals, and voluntary donors in real time so quality
                healthcare is never hindered by time or financial boundaries.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A nation where every blood requisition is fulfilled within 30
                minutes, and every patient facing catastrophic medical bills
                finds a dignified, verified community ready to stand with them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
