"use client";

import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Droplet,
  Flame,
  Heart,
  HeartPulse,
  Info,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

const bloodCompatibilityData: Record<
  BloodGroup,
  {
    canDonateTo: BloodGroup[];
    canReceiveFrom: BloodGroup[];
    fact: string;
    isRare?: boolean;
  }
> = {
  "O+": {
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
    fact: "O Positive is the most needed blood group in Bangladesh for routine and emergency transfusions.",
  },
  "O-": {
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"],
    fact: "Universal Red Cell Donor! O Negative can save patients of ANY blood group during trauma.",
    isRare: true,
  },
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    fact: "A Positive is essential for scheduled cardiac surgeries and cancer platelet support.",
  },
  "A-": {
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
    fact: "A Negative is critical for pediatric and neonatal emergency transfusions.",
    isRare: true,
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    fact: "B Positive represents over 30% of Bangladesh's population with steady daily requirement.",
  },
  "B-": {
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
    fact: "B Negative is one of the rarest blood groups. A single donor can be a life-saver.",
    isRare: true,
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    fact: "Universal Recipient! AB Positive patients can safely receive red cells of any group.",
  },
  "AB-": {
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
    fact: "The rarest blood type on Earth! Less than 1% of the national donor pool carries AB Negative.",
    isRare: true,
  },
};

const bloodGroups: BloodGroup[] = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

const liveDemandList = [
  {
    group: "O-",
    status: "Critical Shortage",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    group: "O+",
    status: "High Demand",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    group: "B-",
    status: "Urgent Needed",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    group: "A+",
    status: "Normal Supply",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    group: "AB-",
    status: "Rare Emergency",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
];

export function BloodMatcherSection() {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>("O+");
  const info = bloodCompatibilityData[selectedGroup];

  return (
    <section className="py-16 md:py-24 bg-card/40 relative border-b border-border/40">
      <div className="container mx-auto px-4 md:px-4 lg:px-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Compatibility & Preparedness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Blood Compatibility & Emergency Readiness
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Know who you can save in an emergency, learn donor guidelines, and
            check current hospital demand across Bangladesh.
          </p>
        </div>

        {/* 3-Column Layout: Left Guidelines | Center Interactive Matrix | Right Live Demand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Donor Guidelines & Preparation Card (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b pb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    Donor Readiness
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Safe donation standards
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Age & Weight
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      18-60 years, minimum 50kg (males) / 48kg (females).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">90-Day Gap</p>
                    <p className="text-[11px] text-muted-foreground">
                      At least 3 months since your last whole blood donation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Hydration & Meal
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Drink plenty of fluids and eat a light meal beforehand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/80 space-y-1">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                Impact Factor
              </span>
              <p className="text-xs text-foreground font-semibold">
                1 Donation = Up to 3 Lives
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Separated into RBCs, platelets, and plasma for 3 patients.
              </p>
            </div>
          </div>

          {/* Center Column: The Interactive Compatibility Tool (col-span-6) */}
          <div className="lg:col-span-6 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Your Blood Group
                </span>
                {/* Blood Group Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {bloodGroups.map((group) => {
                    const isSelected = selectedGroup === group;
                    const isRare = bloodCompatibilityData[group].isRare;

                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setSelectedGroup(group)}
                        className={`relative px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105 ring-2 ring-primary/40"
                            : "bg-muted/60 border border-border hover:border-primary/50 text-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{group}</span>
                        {isRare && (
                          <span
                            className={`text-[8px] uppercase tracking-wider font-extrabold px-1 rounded ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-rose-500/10 text-rose-500"
                            }`}
                          >
                            Rare
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results Grid: Donate To & Receive From */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Can Donate To */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{selectedGroup} Can Donate To:</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {info.canDonateTo.map((target) => (
                      <span
                        key={target}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-card border border-emerald-500/30 font-black text-foreground shadow-xs text-xs"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span>{selectedGroup} Can Receive From:</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {info.canReceiveFrom.map((source) => (
                      <span
                        key={source}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-card border border-primary/30 font-black text-foreground shadow-xs text-xs"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Medical Fact Box */}
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 flex items-start gap-2.5 text-xs">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-semibold">
                    Fact:{" "}
                  </strong>
                  {info.fact}
                </p>
              </div>
            </div>

            {/* Bottom Register CTA inside Center Card */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-foreground">
                  Ready as {selectedGroup} donor?
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Get notified only when urgent.
                </p>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/register" />}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs gap-1.5"
              >
                <span>Register as Donor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Live Blood Group Demand & Emergency Hotline (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">
                      Live Hospital Demand
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Current supply urgency
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 animate-pulse">
                  SOS
                </span>
              </div>

              {/* Demand List */}
              <div className="space-y-2">
                {liveDemandList.map((item) => (
                  <div
                    key={item.group}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-card border font-black text-foreground flex items-center justify-center text-xs">
                        {item.group}
                      </span>
                      <span className="font-medium text-foreground">
                        {item.group} Blood
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Hospital Helpline Box */}
            <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 space-y-2 text-center">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center justify-center gap-1">
                <PhoneCall className="w-3 h-3" />
                24/7 Transfusion Line
              </span>
              <a
                href="tel:+8801234567890"
                className="text-sm font-extrabold text-foreground hover:text-primary transition-colors block"
              >
                +880 1234-567890
              </a>
              <p className="text-[10px] text-muted-foreground">
                Immediate donor coordination for ER trauma & surgery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
