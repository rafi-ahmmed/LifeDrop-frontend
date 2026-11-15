"use client";

import { Award, Stethoscope, UserCheck, Users } from "lucide-react";

const team = [
  {
    name: "Dr. Farhan Masud",
    role: "Medical Director & Hematology Lead",
    bio: "Consultant Transfusion Medicine specialist guiding our medical audit standards and donor safety protocols.",
    icon: Stethoscope,
    badge: "Clinical Lead",
  },
  {
    name: "Dr. Naila Parveen",
    role: "Chief Surgical & Emergency Advisor",
    bio: "Cardiothoracic surgeon ensuring urgent blood requisitions match real hospital ER requirements.",
    icon: Award,
    badge: "ER Specialist",
  },
  {
    name: "Siyam Ahmed",
    role: "Founder & Lead Architect",
    bio: "Full-stack engineer dedicated to solving healthcare bottlenecks through accessible, human-centric software.",
    icon: Users,
    badge: "Platform Lead",
  },
  {
    name: "Tahmina Sultana",
    role: "Director of Community & Donor Care",
    bio: "Coordinating thousands of voluntary youth donors and managing our 24/7 emergency response hotline.",
    icon: UserCheck,
    badge: "Community Care",
  },
];

export function AdvisoryTeam() {
  return (
    <section className="py-16 md:py-24 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Leadership & Medical Advisory Board
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Guided by veteran medical doctors, transfusion specialists, and
            passionate community organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => {
            const Icon = member.icon;

            return (
              <div
                key={member.name}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border">
                      {member.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
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
