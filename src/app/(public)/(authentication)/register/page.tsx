"use client";

import {
  Building2,
  Droplet,
  HeartHandshake,
  ShieldCheck,
  User,
} from "lucide-react";
import Logo from "@/assets/svg/Logo";
import { DonorRegisterForm } from "@/components/from/registration/donor-register-from";
import { HospitalRegisterForm } from "@/components/from/registration/hospital-registration-form";
import { PatientRegisterForm } from "@/components/from/registration/patient-registration-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background text-foreground">
      {/* Left Column: Fixed Header & Centered Form */}
      <div className="flex flex-col h-svh p-6 sm:p-10 md:p-12 overflow-y-auto">
        {/* Fixed Top Brand Header */}
        <Logo />

        {/* Center Container */}
        <div className="flex-1 flex items-start justify-center pt-8 pb-6">
          <div className="w-full max-w-125 space-y-6">
            {/* Header Title & Subtitle */}
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create an Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Join LifeDrop as a patient, donor, or hospital partner
              </p>
            </div>

            {/* Shadcn Tabs with TabsContent */}
            <Tabs
              defaultValue="patient"
              className="w-full px-0 md:px-0 lg:px-4"
            >
              <TabsList className="grid w-full grid-cols-3 h-10 mb-4">
                <TabsTrigger
                  value="patient"
                  className="text-xs flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Patient</span>
                </TabsTrigger>
                <TabsTrigger
                  value="donor"
                  className="text-xs flex items-center gap-1.5"
                >
                  <Droplet className="w-3.5 h-3.5 text-primary" />
                  <span>Donor</span>
                </TabsTrigger>
                <TabsTrigger
                  value="hospital"
                  className="text-xs flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Hospital</span>
                </TabsTrigger>
              </TabsList>

              {/* Patient Form Tab */}
              <TabsContent value="patient" className="mt-2.5 outline-none">
                <PatientRegisterForm />
              </TabsContent>

              {/* Donor Form Tab */}
              <TabsContent value="donor" className="mt-2.5 outline-none">
                <DonorRegisterForm />
              </TabsContent>

              {/* Hospital Form Tab */}
              <TabsContent value="hospital" className="mt-2.5 outline-none">
                {/* <HospitalRegisterForm /> */}
                <HospitalRegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Feature Banner (Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-muted/40 border-l border-border overflow-hidden h-svh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Join Our Lifesaving
            Community
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Save Lives or Request Help in Seconds
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Create an account to become a verified blood donor or instantly
            request emergency blood donations when needed.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 pt-8">
          <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Secure & Confidential
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="text-2xl font-bold text-foreground">24/7</div>
            <div className="text-xs text-muted-foreground mt-1">
              Emergency Support
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <HeartHandshake className="w-4 h-4 text-primary shrink-0" />
          <span>
            Together, we make a difference in moments that matter most.
          </span>
        </div>
      </div>
    </div>
  );
}
