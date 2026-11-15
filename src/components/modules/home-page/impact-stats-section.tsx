"use client";

import {
  Activity,
  CheckCircle2,
  Droplet,
  Heart,
  Hospital,
  MapPin,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

const stats = [
  {
    icon: Droplet,
    value: "15,800+",
    label: "Blood Units Connected",
    sub: "Directly between voluntary donors & patients",
  },
  {
    icon: Heart,
    value: "৳3.4 Cr+",
    label: "Medical Aid Funded",
    sub: "Direct life-saving emergency surgery disbursements",
  },
  {
    icon: Hospital,
    value: "140+",
    label: "Hospital Networks",
    sub: "Dhaka, Chittagong, Sylhet, Rajshahi & beyond",
  },
  {
    icon: MapPin,
    value: "64",
    label: "Districts Covered",
    sub: "Rapid nationwide volunteer response coverage",
  },
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Prescription Audit",
    desc: "Every fund campaign must attach valid hospital prescriptions and diagnostic bills verified by our moderation team.",
  },
  {
    icon: Zap,
    title: "Zero Middleman Delays",
    desc: "Blood donor phone numbers and emergency contacts are shared directly with patient relatives without third-party delay.",
  },
  {
    icon: Lock,
    title: "Safe & Transparent Pay",
    desc: "Seamless, secure integrations for bKash, Nagad, and cards with instant receipts and traceable transaction audit logs.",
  },
];

export function ImpactStatsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm text-center sm:text-left space-y-3 relative group hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto sm:mx-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Transparency Feature Strip */}
        <div className="bg-muted/40 border border-border/80 rounded-3xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Built on Uncompromising Trust & Medical Integrity
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              In life-or-death situations, trust is non-negotiable. Here is how
              we ensure transparency for every donor and patient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.title}
                  className="bg-card border border-border/60 rounded-2xl p-5 space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
