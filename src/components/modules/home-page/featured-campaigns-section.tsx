"use client";

import {
  ArrowRight,
  Building2,
  Calendar,
  Eye,
  Heart,
  HeartHandshake,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CampaignDetailsModal } from "@/components/modules/campaigns/campaign-details-modal";
import { Button } from "@/components/ui/button";
import { useGetAllCampaigns } from "@/hooks";
import type { TFundCampaign } from "@/types/campaign.type";

const fallbackCampaigns: TFundCampaign[] = [
  {
    id: "camp-01",
    userId: "usr-01",
    patientName: "Sumaiya Akhter (Age 7)",
    hospitalName: "National Institute of Cardiovascular Diseases, Dhaka",
    contactNumber: "01712345678",
    title: "Urgent Pediatric Open Heart Surgery for Sumaiya",
    description:
      "7-year-old Sumaiya was diagnosed with Ventricular Septal Defect (VSD). Her father is a rickshaw puller and cannot afford the emergency heart operation costs. Every contribution helps give Sumaiya a chance at life.",
    status: "ACTIVE",
    targetAmount: "350000",
    collectedAmount: "215000",
    deadline: new Date(Date.now() + 86400000 * 12).toISOString(),
    medicalDocuments: [],
    reviewedBy: null,
    reviewedAt: null,
    rejectedReason: null,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "camp-02",
    userId: "usr-02",
    patientName: "Kamal Hossain",
    hospitalName: "Square Hospitals Ltd, Dhaka",
    contactNumber: "01898765432",
    title: "Emergency Bone Marrow Transplant & Chemotherapy",
    description:
      "Kamal is fighting acute leukemia. His immediate chemotherapy cycles and upcoming bone marrow transplant require urgent funds. Medical reports are fully verified by hospital oncologists.",
    status: "ACTIVE",
    targetAmount: "600000",
    collectedAmount: "390000",
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    medicalDocuments: [],
    reviewedBy: null,
    reviewedAt: null,
    rejectedReason: null,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "camp-03",
    userId: "usr-03",
    patientName: "Tahmid Karim (Age 12)",
    hospitalName: "BSMMU Hospital, Dhaka",
    contactNumber: "01611223344",
    title: "Emergency Pediatric Kidney Dialysis & ICU Care",
    description:
      "Tahmid was admitted with acute renal distress. Daily hemodialysis and post-transplant stabilization are critically needed to save his life.",
    status: "ACTIVE",
    targetAmount: "450000",
    collectedAmount: "310000",
    deadline: new Date(Date.now() + 86400000 * 15).toISOString(),
    medicalDocuments: [],
    reviewedBy: null,
    reviewedAt: null,
    rejectedReason: null,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function FeaturedCampaignsSection() {
  const { data: response } = useGetAllCampaigns();
  const [selectedCampaign, setSelectedCampaign] =
    useState<TFundCampaign | null>(null);

  const apiCampaigns: TFundCampaign[] = Array.isArray(response?.data)
    ? response.data
    : (response?.data as any)?.campaigns || [];

  const displayCampaigns =
    apiCampaigns.length > 0 ? apiCampaigns.slice(0, 3) : fallbackCampaigns;

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Medical Emergencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Urgent Medical Fundraising Cases
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              These patients require immediate financial support for
              life-critical surgeries, transplants, and therapies.
            </p>
          </div>

          <Button
            nativeButton={false}
            render={<Link href="/campaigns" />}
            variant="outline"
            className="rounded-xl font-semibold self-start md:self-auto gap-2"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCampaigns.map((campaign) => {
            const target = Number(campaign.targetAmount) || 1;
            const collected = Number(campaign.collectedAmount) || 0;
            const progress = Math.min(
              Math.round((collected / target) * 100),
              100,
            );

            return (
              <div
                key={campaign.id}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative space-y-5 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary/60" />

                {/* Card Top Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                      Critical Support
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {campaign.status || "ACTIVE"}
                  </span>
                </div>

                {/* Patient & Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
                    <User className="w-3.5 h-3.5" />
                    <span>Patient: {campaign.patientName}</span>
                  </div>

                  <h3 className="font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {campaign.title}
                  </h3>

                  {campaign.hospitalName && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                      <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{campaign.hospitalName}</span>
                    </p>
                  )}
                </div>

                {/* Progress Bar & Amounts */}
                <div className="space-y-2 pt-3 border-t border-border/80">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">
                      Raised:{" "}
                      <strong className="text-foreground">
                        ৳{collected.toLocaleString()}
                      </strong>
                    </span>
                    <span className="text-muted-foreground">
                      Goal:{" "}
                      <strong className="text-foreground">
                        ৳{target.toLocaleString()}
                      </strong>
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-0.5">
                    <span className="font-bold text-primary">
                      {progress}% Funded
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {campaign.deadline
                        ? `Ends ${new Date(campaign.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
                        : "Active"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 text-xs font-semibold rounded-xl cursor-pointer"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    <span>Case Details</span>
                  </Button>

                  <Button
                    nativeButton={false}
                    render={<Link href={`/campaigns/${campaign.id}/donate`} />}
                    className="h-9 text-xs font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Donate Now</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Details */}
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={!!selectedCampaign}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedCampaign(null);
          }}
        />
      </div>
    </section>
  );
}
