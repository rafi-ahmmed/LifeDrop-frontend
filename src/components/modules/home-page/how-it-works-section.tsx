"use client";

import {
  BellRing,
  CheckCircle,
  FileSpreadsheet,
  FileUp,
  Heart,
  Hospital,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

type RoleType = "donors" | "patients" | "hospitals";

const workflows = {
  donors: [
    {
      step: "01",
      icon: UserCheck,
      title: "Register Your Blood Group",
      desc: "Sign up in 30 seconds with your blood type, division, and emergency availability status.",
    },
    {
      step: "02",
      icon: BellRing,
      title: "Receive Live Emergency Alerts",
      desc: "Get instant alerts only when a patient in your vicinity urgently needs your exact blood match.",
    },
    {
      step: "03",
      icon: Hospital,
      title: "Donate at Certified Hospital",
      desc: "Coordinate directly with the patient attendee or hospital blood bank for a safe transfusion.",
    },
    {
      step: "04",
      icon: Heart,
      title: "Track Your Life-Saving Impact",
      desc: "Join thousands of active heroes saving lives and earn community badges.",
    },
  ],
  patients: [
    {
      step: "01",
      icon: FileUp,
      title: "Create Emergency Campaign",
      desc: "Fill in patient diagnosis, required hospital funds, and target deadline.",
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Hospital Document Verification",
      desc: "Upload certified prescription and diagnostic test reports for quick admin approval.",
    },
    {
      step: "03",
      icon: Sparkles,
      title: "Community Fundraising Goes Live",
      desc: "Share verified campaign link across social networks, families, and philanthropists.",
    },
    {
      step: "04",
      icon: CheckCircle,
      title: "Direct Payout for Surgery",
      desc: "Transparently disburse donations directly to hospital accounts or verified patient guardians.",
    },
  ],
  hospitals: [
    {
      step: "01",
      icon: Hospital,
      title: "Connect as Hospital Partner",
      desc: "Institutional onboarding for medical officers, emergency rooms, and blood banks.",
    },
    {
      step: "02",
      icon: FileSpreadsheet,
      title: "Direct Patient Verification",
      desc: "Authenticate medical bills and blood requirements to prevent fraud.",
    },
    {
      step: "03",
      icon: Users,
      title: "Broadcast Emergency Requisitions",
      desc: "Summon specific blood groups in bulk during major trauma or disaster events.",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Real-time Transfusion Records",
      desc: "Ensure 100% trace-free, safe, voluntary donation practices.",
    },
  ],
};

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<RoleType>("donors");
  const steps = workflows[activeTab];

  return (
    <section className="py-16 md:py-24 bg-card/40 border-b border-border/40 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent & Simple</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How LifeDrop Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Whether you want to donate blood, raise medical funds, or coordinate
            emergency cases, the process is fast and seamless.
          </p>

          {/* Interactive Role Switcher Tabs */}
          <div className="inline-flex items-center p-1.5 bg-muted/80 rounded-2xl gap-1 mt-6 border border-border/60">
            <button
              type="button"
              onClick={() => setActiveTab("donors")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "donors"
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🩸 For Donors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("patients")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "patients"
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🏥 For Patients
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hospitals")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "hospitals"
                  ? "bg-card text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🩺 For Hospitals
            </button>
          </div>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30 font-mono">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 transition-all duration-300"
                    style={{ width: `${(idx + 1) * 25}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
