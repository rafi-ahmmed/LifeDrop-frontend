"use client";

import { Eye, HeartHandshake, ShieldCheck, Zap } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Medical Verification",
    desc: "We prioritize patient safety and donor trust above all. Every medical campaign undergoes authentic prescription checks and diagnosis audits before public listing.",
  },
  {
    icon: Zap,
    title: "Urgent Response Speed",
    desc: "In hemorrhages, trauma surgeries, and heart emergencies, minutes count. Our routing connects nearby donors instantly without administrative bottlenecks.",
  },
  {
    icon: Eye,
    title: "Radical Financial Transparency",
    desc: "Every taka donated is accounted for. We facilitate direct disbursements to verified hospital bills so donors know exactly how their generosity saved a life.",
  },
  {
    icon: HeartHandshake,
    title: "Dignity & Compassion",
    desc: "Medical hardship should never compromise human dignity. We treat patients and families with deep respect, privacy protection, and continuous support.",
  },
];

export function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-card/40 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Our Guiding Principles
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            The core pillars that steer every line of code, verification
            process, and community interaction at LifeDrop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;

            return (
              <div
                key={v.title}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 hover:border-primary/50 transition-colors flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
